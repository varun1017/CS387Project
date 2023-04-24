const { formSchema3 } = require("./sellform");

const validatesellForm = (req, res) => {
  const formData1 = req.body;
  formSchema3
    .validate(formData1)
    .catch(err => {
      //res.status(422).send();
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        console.log("sell form is good");
      }
    });
};

module.exports = validatesellForm;