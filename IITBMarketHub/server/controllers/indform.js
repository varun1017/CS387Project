const Yup = require("yup");

const formSchema = Yup.object({
  userid: Yup.string()
    .required("Userid required")
    .min(9, "Userid too short")
    .max(9, "Userid too long!"),
  email: Yup.string()
    .required("Email required")
    .min(10, "Email too short")
    .max(100, "Email too long!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
  username: Yup.string()
    .required("Username required")
    .min(1, "Username too short")
    .max(30, "Username too long!"),
  phnum: Yup.string()
    .required("phone number required")
    .min(10,"ph num too short")
    .max(10,"ph num too long"),
  useraddress: Yup.string()
    .required("Useraddress required")
    .min(1, "Useraddress too short")
    .max(50, "Useraddress too long"),
});

module.exports = { formSchema };