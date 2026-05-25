const jwt = require("jsonwebtoken");

function getAdminConfig() {
  return {
    username: process.env.ADMIN_USERNAME?.trim(),
    password: process.env.ADMIN_PASSWORD?.trim(),
    jwtSecret: process.env.JWT_SECRET?.trim(),
  };
}

function loginAdmin(req, res) {
  const { username, password, jwtSecret } = getAdminConfig();
  const providedUsername = String(req.body.username || "").trim();
  const providedPassword = String(req.body.password || "");

  if (!username || !password || !jwtSecret) {
    return res.status(500).json({ message: "Admin authentication is not configured." });
  }

  if (providedUsername !== username || providedPassword !== password) {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }

  const token = jwt.sign({ sub: username, role: "admin" }, jwtSecret, {
    expiresIn: "8h",
  });

  return res.json({
    message: "Admin login successful.",
    token,
    admin: {
      username,
      role: "admin",
    },
  });
}

function getAdminSession(req, res) {
  return res.json({
    admin: {
      username: req.admin.username,
      role: req.admin.role,
    },
  });
}

module.exports = {
  getAdminSession,
  loginAdmin,
};
