const express = require("express");
const validateloginForm = require("./controllers/validateloginForm");
const validatesignupForm = require("./controllers/validatesignupForm");
const validatesellForm = require("./controllers/validatesellForm");
const router = express.Router();
const pool = require("./db");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const fs = require('fs');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images/')
  },
  filename: (req, file, cb) => {
    console.log("image uploading",file);
      cb(null, req.session.user.userid+"_"+Date.now()+"_"+file.originalname)
  },
});

const upload = multer({storage: storage});


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

  router.post("/sell",upload.fields([{name:'photo',maxCount: 1}]),async (req, res) =>{
    // validatesellForm(req, {});
    // console.log(res);
    // console.log("-----------------------------------------------------------------------------------------------------1");
    // console.log(req);
    // console.log("------------------------------------------------------------------------------------------------------2");
    // console.log(req.session.user);
    // console.log("fv");
    // console.log(req.files);
    // console.log("-----------------3");
    // console.log(res.req.files);
    // console.log("--------------4");
    // console.log("--------------------------------------------------------0");
    // console.log(res);
    // console.log("---------------------------------------------------------1");
    // console.log(res.req.body);
    // console.log("---------------------------------------------------------2");
    // console.log(req.session);
    // console.log("---------------------------------------------------------3");
    // console.log(res);
    var fb = {};
    console.log(res.req);
    console.log(res.req.files);
    const photoFile = req.files.photo[0];
    console.log(photoFile);
    const photoData = fs.readFileSync(photoFile.path);
    const query = await pool.query(
      "INSERT INTO products(seller_id,prod_name,prod_desc,category_id,price,prod_expdate,product_image) values ($1,$2,$3,$4,$5,$6,$7);",
      [req.session.user.userid,res.req.body.prodName,res.req.body.prodDesc,res.req.body.category,res.req.body.price,res.req.body.prodExpDate,photoData]
    );
    fb = {1:'var0'};
    res.json(fb);
    res.end();
  });

  // router.post("/upload/image",upload.fields([{name:'photo',maxCount: 1}]), async(req, res) =>{
  //   console.log("-----------------------------1");
  //   console.log(res.req.files);
  //   const photoFile = req.files.photo[0];
  //   console.log(photoFile);
  //   const photoData = fs.readFileSync(photoFile.path);
  //   console.log(photoData);
  //   var fb = {};
  //   // const query = await pool.query(
      
  //   // );
  //   fb = {1:'var0'};
  //   res.json(fb);
  //   res.end();
  // });

  router.route("/products").get(async (req,res) => {
    // validateForm(req,{});
  
    const query = await pool.query(
      "select prod_id,seller_id,prod_name,prod_desc,cat_name,price,prod_expdate,created_at from products natural join category where products.seller_id != $1 and buyer_id IS NULL;",
      [req.session.user.userid]
    );
  
    console.log(query.rows);
  
    res.json(query.rows);
    res.end();
  
  });

  router.route("/myproducts").get(async (req,res) => {
    // validateForm(req,{});
  
    const query = await pool.query(
      "select prod_id,seller_id,prod_name,prod_desc,cat_name,price,prod_expdate,created_at from products natural join category where products.seller_id = $1;",
      [req.session.user.userid]
    );
  
    console.log(query.rows);
  
    res.json(query.rows);
    res.end();
  
  });

  router.route("/reqproduct").post(async (req, res) => {
    // validateForm(req, {});
    console.log(res.req.body.prod_id);
    console.log(res.req.body.seller_id);
    // var quer1 = res.json();
    // console.log(quer1.rows); 
    var fb = {};
  
    fb = {1:'var0'}

    const query0 = await pool.query(
      "select exists(select 1 from product_requests where product_id=$1 and seller_id=$2 and buyer_id=$3);",
      [res.req.body.prod_id,res.req.body.seller_id,req.session.user.userid]
    );

    console.log(query0.rows[0].exists);
    if(query0.rows[0].exists==0){
      console.log("hi");
      const query = await pool.query(
        "INSERT INTO product_requests(product_id,seller_id,buyer_id) VALUES ($1,$2,$3);",
        [res.req.body.prod_id,res.req.body.seller_id,req.session.user.userid]
      );
      fb = {1:'var1'};
    }

    // if(query.rows[0].result == 'TRUE'){
    //   fb = {1:'var1'}
    // }
    // if(query.rows[0].result == 'FALSE'){
    //   fb = {1:'var2'}
    // }
    // console.log(query0.rows[0]);
    res.json(fb);
    res.end();
  });


  router.route("/products/inreq").get(async (req,res) => {
    // validateForm(req,{});
  
    const query = await pool.query(
      "select prod_id,prod_name,prod_desc,cat_name,price,product_requests.buyer_id from (products natural join category),product_requests where products.prod_id = product_requests.product_id and products.seller_id = product_requests.seller_id and product_requests.seller_id = $1 and products.buyer_id IS NULL;",
      [req.session.user.userid]
    );
  
    console.log(query.rows);
  
    res.json(query.rows);
    res.end();
  
  });

  router.route("/products/outreq").get(async (req,res) => {
    // validateForm(req,{});
  
    const query = await pool.query(
      "select prod_id,prod_name,prod_desc,cat_name,price,product_requests.seller_id from (products natural join category),product_requests where products.prod_id = product_requests.product_id and products.seller_id = product_requests.seller_id and product_requests.buyer_id = $1 and products.buyer_id IS NULL;",
      [req.session.user.userid]
    );
  
    console.log(query.rows);
  
    res.json(query.rows);
    res.end();
  
  });

  router.route("/myproducts/confirm").post(async (req, res) => {
    // validateForm(req, {});
    console.log(res.req.body.prod_id);
    console.log(res.req.body.buyer_id);
    // var quer1 = res.json();
    // console.log(quer1.rows); 
    var fb = {};
  
    fb = {1:'var0'}
    const query = await pool.query(
      "UPDATE products set buyer_id = $1 where prod_id = $2;",
      [res.req.body.buyer_id,res.req.body.prod_id]
    );
    // console.log(query0.rows[0]);
    res.json(fb);
    res.end();
  });

  router.route("/products/sold").get(async (req,res) => {
    // validateForm(req,{});
  
    const query = await pool.query(
      "select prod_id,prod_name,prod_desc,cat_name,price,buyer_id from (products natural join category) where seller_id = $1 and buyer_id IS NOT NULL;",
      [req.session.user.userid]
    );
  
    console.log(query.rows);
  
    res.json(query.rows);
    res.end();
  
  });

  router.route("/products/buyed").get(async (req,res) => {
    // validateForm(req,{});
  
    const query = await pool.query(
      "select prod_id,prod_name,prod_desc,cat_name,price,seller_id from (products natural join category) where buyer_id = $1;",
      [req.session.user.userid]
    );
  
    console.log(query.rows);
  
    res.json(query.rows);
    res.end();
  
  });

  router.route("/logout").get(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
        }
        });
    res.json({ loggedIn: false });
    res.end();
  });


module.exports = router;
