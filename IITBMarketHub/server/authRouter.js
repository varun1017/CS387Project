const express = require("express");
const validateloginForm = require("./controllers/validateloginForm");
const validatesignupForm = require("./controllers/validatesignupForm");
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

    console.log(req.body);

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

module.exports = router;
