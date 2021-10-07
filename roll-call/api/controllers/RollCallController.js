/**
 * RollCallController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * 发布点名
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  publish: async function (req, res) {
    var message = req.body.message;

    var date = parseInt(Date.parse(new Date()));
    await RollCall.create({
      date,
      expireTime: date + 3 * 60 * 1000,
      comment: message ? message : ""
    });

    return res.json({
      code: 200,
      msg: "success"
    });
  },

  /**
   * 查询已发布的点名
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  select: async function (req, res) {
    var data = await RollCall.find();
    return res.json({
      code: 200,
      msg: "success",
      data
    });
  }

};

