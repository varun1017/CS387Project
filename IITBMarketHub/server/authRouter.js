const express = require("express");
const validateloginForm = require("./controllers/validateloginForm");
const validatesignupForm = require("./controllers/validatesignupForm");
const validatesellForm = require("./controllers/validatesellForm");
const router = express.Router();
const pool = require("./db");
const bcrypt = require("bcrypt");

router.route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.userid) {
      res.json({ loggedIn: true, userid: req.session.user.userid });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validateloginForm(req, res);

    // console.log(req.body);

    const potentialLogin = await pool.query(
      "SELECT user_id, hashed_password FROM users u WHERE u.user_id=$1",
      [req.body.userid]
    );


    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].hashed_password
      );
      if (isSamePass) {
        req.session.user = {
          userid: req.body.userid,
          // id: potentialLogin.rows[0].id,
        };
        res.json({ loggedIn: true, userid: req.body.userid });
      } else {
        res.json({ loggedIn: false, status: "Wrong userid or password!" });
        // console.log("not good");
      }
    } else {
      // console.log("not good");
      res.json({ loggedIn: false, status: "Wrong userid or password!" });
    }
  });


router.post("/signup", async (req, res) => {
    validatesignupForm(req, res);
  
    const existingUser = await pool.query(
      "SELECT user_id from users WHERE user_id=$1",
      [req.body.userid]
    );

    if (existingUser.rowCount === 0) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUserQuery = await pool.query(
        "INSERT INTO users(user_id, email, hashed_password, user_name, ph_num, user_address) values($1,$2,$3,$4,$5,$6) RETURNING user_id",
        [req.body.userid,req.body.email, hashedPass,req.body.username,req.body.phnum,req.body.useraddress]
      );
      req.session.user = {
        userid: req.body.userid,
      };
  
      res.json({ loggedIn: true, userid: req.body.userid });
      
    } else {
      res.json({ loggedIn: false, status: "Userid registered" });
    }
  });

  router.route("/dashboard").get(async (req, res) => {
    validateloginForm(req, {});
    // console.log(req.session);
    const query1 = await pool.query(
      "select user_name from users where user_id = $1",
      [req.session.user.userid]
    );
    res.json([query1.rows]);
    res.end();
  });

  router.post("/sell", async (req, res) =>{
    // validatesellForm(req, {});
    console.log(res.req.body);
    console.log(req.session.user);
    console.log("fv");
    var fb = {};
    const query = await pool.query(
      "INSERT INTO products(seller_id,prod_name,prod_desc,category_id,price,prod_expdate) values ($1,$2,$3,$4,$5,$6);",
      [req.session.user.userid,res.req.body.prodName,res.req.body.prodDesc,res.req.body.category,res.req.body.price,res.req.body.prodExpDate]
    );
    fb = {1:'var0'}
    res.json(fb);
    res.end();
  });

module.exports = router;
