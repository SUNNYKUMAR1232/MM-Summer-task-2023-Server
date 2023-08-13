const jwt = require("jsonwebtoken");

const config = process.env;
 
// create varify token function
const verifyToken = (req, res, next) => {
            //  take token throw  as body , query or headers
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
   // if token not given than
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
            // decode token throw given secret key
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // send req as that varify
    req.user = decoded;
  } catch (err) {
            // if not tha send a message
    return res.status(401).send("Invalid Token");
  }
  // stop req-res cycle
  return next();
};

module.exports = verifyToken;
