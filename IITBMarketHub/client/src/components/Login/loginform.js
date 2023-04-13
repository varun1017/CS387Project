const Yup = require("yup");

const formSchema1 = Yup.object({
  userid: Yup.string()
    .required("Userid required")
    .min(9, "Userid too short")
    .max(9, "Userid too long!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
});

module.exports = { formSchema1 };