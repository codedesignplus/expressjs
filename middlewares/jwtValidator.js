const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "The token is required",
    });
  }

  try {
    const { uid, name } = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_JWT_SEED
    );

    req.identity = { uid, name };
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalid",
    });
  }

  next();
};

module.exports = {
  jwtValidator,
};
