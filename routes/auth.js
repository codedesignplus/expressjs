const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();

const { login, createUser, renewToken } = require("../controllers/auth");

router.post(
  "/",
  [
    check("email", "The field email is required").isEmail(),
    check(
      "password",
      "The password should be greather than 6 characters"
    ).isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  login
);

router.post(
  "/create",
  [
    check("name", "The field name is required").not().isEmpty(),
    check("email", "The field email is required").isEmail(),
    check(
      "password",
      "The password should be greather than 6 characters"
    ).isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
);

router.post("/renew", [jwtValidator], renewToken);

module.exports = router;
