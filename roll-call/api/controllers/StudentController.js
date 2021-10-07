/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let EthApi = require('../eth/RollCallEthApiInit').database;

module.exports = {

  /**
   * 添加学生
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  addStudent: async function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var classes = req.body.classes ? req.body.classes : "1";
    var teacher = req.body.teacher ? req.body.classes : "1";
    if (!(id && name)) {
      return res.json({
        code: 500,
        msg: "缺少学号和姓名"
      });
    }
    await Student.create({
      id: id,
      name: name,
      classes: classes,
      teacher: teacher
    });
    EthApi.addStudent(id, name, classes, teacher)
      .then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    return res.json({
      code: 200,
      msg: "正在同步区块链"
    });
  },

  /**
   * 删除学生
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  deleteStudent: async function (req, res) {
    var id = req.body.id;
    await Student.destroy({
      id: id
    });
    EthApi.deleteStudent(id).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
    return res.json({
      code: 200,
      msg: "success"
    });
  },

  /**
   * 更新学生
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  updateStudent: async function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var classes = req.body.classes ? req.body.classes : "1";
    var teacher = req.body.teacher ? req.body.teacher : "1";

    if (!(id && name && classes && teacher)) {
      return res.json({
        code: 500,
        msg: "缺少学生信息"
      });
    }
    EthApi.updateStudent(id, name, classes, teacher)
      .then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    await Student.update({id: id})
      .set({
        name,
        classes,
        teacher: teacher
      })
      .fetch()
      .then( (data)=>{
        if (data.length === 0) {
          return res.notFound();
        } else {
          return res.json({
            code: 200,
            msg: "success",
            data
          });
        }
      });
  },

  /**
   * `StudentController.selectAllStudent()`
   */
  selectAllStudent: async function (req, res) {
    var result = await Student.find();

    return res.json({
      code: 200,
      msg: "success",
      data: result
    });
  }

};

