const jwt = require("jsonwebtoken");
const { User } = require("../db");
async function userMiddleware(req, res, next) {
  
  const token = req.headers.authorization;
  const signature = token.split(" ");
  const jwtToken = signature[1];
  try {
    const decodedToken = jwt.verify(jwtToken, "12345");
    const user = await User.findOne({ username: decodedToken.username });
    if (!decodedToken.username) {
      res.status(403).json({ msg: "invalid credentials" });
    } else {
      next();
    }
  } catch (e) {
    res.json(e);
  }
}

module.exports = userMiddleware;
