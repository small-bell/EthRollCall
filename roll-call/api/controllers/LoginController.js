/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Token = require('../utils/token');

module.exports = {

  /**
   * 用户登录
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  doLogin: async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    if (!(username && password)) {
      return res.json({
        code: 500,
        msg: "缺少username和password！"
      });
    }
    if (!(username === "admin" && password === "admin")) {
      return res.json({
        code: 500,
        msg: "无效的username和password！"
      });
    }
    var token = Token.encrypt({
      username: "admin",
      password: "admin"
    }, '15d');
    return res.json({
      code: 200,
      token: token
    });
  }

};

