const { formSchema1 } = require("./loginform");

const validateloginForm = (req, res) => {
  const formData1 = req.body;
  formSchema1
    .validate(formData1)
    .catch(err => {
      //res.status(422).send();
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        console.log("login form is good");
      }
    });
};

module.exports = validateloginForm;