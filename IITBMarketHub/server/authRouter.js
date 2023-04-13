const express = require("express");
const validateForm = require("./controllers/validateForm");
const router = express.Router();
const pool = require("./db");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    validateForm(req, res);
  
    const existingUser = await pool.query(
      "SELECT user_id from users WHERE user_id=$1",
      [req.body.userid]
    );

    if (existingUser.rowCount === 0) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPass);
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
