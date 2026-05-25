const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const authHeader = req.get("Authorization") || "";
  const authParts = authHeader.split(" ");
  const [scheme, token] = authParts;
  const jwtSecret = process.env.JWT_SECRET?.trim();

  if (authParts.length !== 2 || scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Admin authentication required." });
  }

  if (!jwtSecret) {
    return res.status(500).json({ message: "Admin authentication is not configured." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.role !== "admin" || !decoded.sub) {
      return res.status(401).json({ message: "Invalid admin token." });
    }

    req.admin = {
      username: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid admin token." });
  }
}

module.exports = {
  requireAdmin,
};
