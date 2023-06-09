const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new AuthError('Требуется авторизация'));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;

  // if (!token) {
  //   next(new AuthError('Требуется авторизация'));
  //   return;
  // }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Требуется авторизация'));
  }

  req.user = payload;

  next();
};
