const { check, validationResult } = require("express-validator");
module.exports.notLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return res.json({
      info: {
        error: "Already logged In",
      },
    });
  next();
};
module.exports.signinValidator = (req, res, next) => {
  check("email", "email id cannot be blank").notEmpty(),
    check("email", "Write a valid email id").isEmail(),
    check("password", "Write a password").notEmpty(),
    check("password", "password must be atleast 4 character").isLength({
      min: 4,
      max: 150,
    });
  const errors = validationResult(req);

  if (errors.errors.length >= 1) {
    const firstError = errors.errors.map((err) => err.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  }
  next();
};

module.exports.signupValidator = (req, res, next) => {
  check("email", "email id cannot be blank").notEmpty(),
    check("email", "Write a valid email id").isEmail(),
    check("name", "Write a valid name").notEmpty(),
    check("name", "name must be atleast 4 character").isLength({
      min: 4,
      max: 70,
    }),
    check("password", "Write a password").notEmpty(),
    check("password2", "repeat the password again").notEmpty(),
    check("password", "password must be atleast 4 character").isLength({
      min: 4,
      max: 150,
    }),
    check("password2", "repeat password must be atleast 4 character").isLength({
      min: 4,
      max: 150,
    });

  const errors = validationResult(req);
  if (errors.errors.length >= 1) {
    const firstError = errors.errors.map((err) => err.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  }
  next();
};

module.exports.isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else return res.json({ err: "Not logged in" });
};
