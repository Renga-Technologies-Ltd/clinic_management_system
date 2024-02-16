const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }

  // Decode the token payload without verifying it
  console.log("Token:", token);
  const decodedPayload = jwt.decode(token, { complete: true });

  console.log("Decoded Token Payload:", decodedPayload);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }

    req.user = user;
    next();
  });
};

const generateToken = (user) => {

  const token = jwt.sign(
    {
      username: user.username,
      roles: user.roles,
      profile: user.profile,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { authenticateToken, generateToken };
