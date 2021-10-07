/**
 * RecordController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let EthApi = require('../eth/RollCallEthApiInit').database;
let urlencode = require('urlencode');

module.exports = {

  /**
   * 创建记录
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  addRecord: async function (req, res) {
    var date = req.body.date;
    var number = req.body.number;
    var absences = req.body.absences;

    if (!(date && number && absences)) {
      return res.json({
        code: 500,
        msg: "缺少参数"
      });
    }

    let studentsRecord = await Student.find({
      id: number,
    });

    if (studentsRecord.length == 0) {
      return res.json({
        code: 404,
        msg: "查无此人"
      });
    }

    let results = await Record.find({
      date: date,
      number: number
    });
    if (results.length > 0) {
      return res.json({
        code: 500,
        msg: "已经签到过了"
      });
    }
    await Record.create({
      date,
      number,
      absences
    });
    return res.json({
      code: 200,
      msg: "success"
    });
  },

  /**
   * 根据date查找记录（未缺勤的）
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  selectRecord: async function (req, res) {
    var date = req.query.date;
    if (!date) {
      return res.json({
        code: 500,
        msg: "缺少参数"
      });
    }
    let records = await Record.find({
      date
    });
    let students = await Student.find();
    let studentSize = students.length;
    let result = [];
    records.forEach((item) => {
      for (let i = 0; i < studentSize; i++) {
        if (students[i].id == item.number) {
          item.name = students[i].name;
          result.push(item);
          break;
        }
      }
      item.number
    });

    EthApi.selectInStudent(date).then((promiseResult) => {
      EthApi.addInStudent(date, urlencode(JSON.stringify(result)))
        .then((result1) => {
          console.log(result1);
        }).catch((err) => {
        console.log(err);
      });
      if (promiseResult !== '') {
        return res.json({
          code: 200,
          msg: "success",
          data: JSON.parse(urlencode.decode(promiseResult))
        });
      }
      return res.json({
        code: 200,
        msg: "success",
        data: result
      });
    }).catch((err) => {
      return res.json({
        code: 200,
        msg: "success",
        data: result
      });
    })

  },

  /**
   * 查找Date记录
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  selectDate: async function (req, res) {
    await Record.getDatastore()
      .sendNativeQuery("select DISTINCT date from record;",
      function(err, results, fields) {
        return res.json({
          code: 200,
          msg: "success",
          data: results.rows
        });
      });
  },

  /**
   * 查询缺席人
   * @param req
   * @param res
   * @returns {Promise<any>}
   */
  selectAbsence: async function (req, res) {
    var date = req.query.date;
    if (!date) {
      return res.json({
        code: 500,
        msg: "缺少参数"
      });
    }
    var myDate = 1;
    try {
      myDate = parseInt(date)
    } catch (e) {
      return res.json({
        code: 500,
        msg: "缺少参数"
      });
    }

    var result = await Record.getDatastore()
      .sendNativeQuery("select id, name from student where id not in " +
        "(select number from record where date = " + myDate + ")",
      function(err, results, fields) {

        EthApi.selectAbsStudent(date).then((promiseResult) => {
          EthApi.addAbsStudent(date, urlencode(JSON.stringify(results)))
            .then((result1) => {
              console.log(result1);
            }).catch((err) => {
            console.log(err);
          });
          if (promiseResult !== '') {
            return res.json({
              code: 200,
              msg: "success",
              data: JSON.parse(urlencode.decode(promiseResult))
            });
          }
          return res.json({
            code: 200,
            msg: "success",
            data: results
          });
        }).catch((err) => {
          return res.json({
            code: 200,
            msg: "success",
            data: results
          });
        })
        // return res.json({
        //   code: 200,
        //   msg: "success",
        //   data: results.rows
        // });
      });
  }
};

