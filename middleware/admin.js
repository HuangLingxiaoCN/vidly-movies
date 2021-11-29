module.exports = function (req, res, next) {
  // req.user
  // 403 Forbidden
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  next();
}