const router = require("express").Router();
const {
  postRegister,

} = require("../controllers/auth.controller");
const { userValidationSchema } = require("../validations/auth.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const validateUser = validateSchema(userValidationSchema);

router.post("/signup", validateUser, postRegister);

module.exports = router;
