const jwt = require('jsonwebtoken');

const Token = {

  // 加密
  encrypt: function(data,time) {
    return jwt.sign(data, 'token', {expiresIn:time})
  },

  // 解密
  decrypt: function(token) {
    try {
      let data = jwt.verify(token, 'token');
      return {
        token: true,
        data: data
      };
    } catch (e) {
      return {
        token: false,
        data: e
      }
    }
  }
};

module.exports = Token;
