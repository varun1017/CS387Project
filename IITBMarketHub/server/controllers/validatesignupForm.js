const { formSchema2 } = require("./signupform");

const validatesignupForm = (req, res) => {
  const formData2 = req.body;
  formSchema2
    .validate(formData2)
    .catch(err => {
      //res.status(422).send();
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        console.log("signup form is good");
      }
    });
};

module.exports = validatesignupForm;