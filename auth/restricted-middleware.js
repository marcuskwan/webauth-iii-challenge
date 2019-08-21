const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.token;

  // check that the token is valid
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({ you: "shall not pass!" });
      } else {
        // token is goooooooood
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please send a token" });
  }
};
