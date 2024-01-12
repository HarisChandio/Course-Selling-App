const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
// Middleware for handling auth

const jwtPrivateKey = "12345";
async function adminMiddleware(req, res, next) {
  
  const token = req.headers.authorization;
  const signature =  token.split(" ");
  const jwtToken = signature[1];
  try {
    const decodedToken = jwt.verify(jwtToken, jwtPrivateKey);
    if (!decodedToken.username) {
      res.status(403).json({
        msg: "invalid credentials",
      });
    } else {
      next();
    }
  } catch (e) {
    res.json(e);
  }
}
module.exports = adminMiddleware;
