/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `TestController.test()`
   */
  test: async function (req, res) {
    return res.json({
      todo: 'test() is not implemented yet!'
    });
  }

};

