

const authGuard = (req, res, next) => {
  if (req.session?.user?.verified) {
    next();
  }

  return res.status(401).send();
}

module.exports = {
  authGuard
}