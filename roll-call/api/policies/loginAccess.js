const Token = require('../utils/token');

// token中间件
module.exports = async function (req, res, proceed) {

  // 是否有token
  var token = req.headers.token;
  var username = req.headers.username;
  if (!(token && username)) {
    return res.forbidden();
  }

  // 解析token
  var tokenResult = Token.decrypt(token);
  if (!tokenResult.token) {
    return res.forbidden();
  }
  var uusername = tokenResult.data.username;
  var password = tokenResult.data.password;
  if (!(uusername === "admin" && password === "admin")) {
    return res.forbidden();
  }

  return proceed();

};
