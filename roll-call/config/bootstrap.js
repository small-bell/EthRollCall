/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // 定时删除发布的结果
  const create_date = parseInt(Date.parse(new Date()));
  await RollCall.create({
    date: create_date,
    expireTime: create_date + 25000,
    comment: ""
  });
  new Promise(function () {
    setInterval(function () {
      RollCall.find().then((records) => {
        var date = parseInt(Date.parse(new Date()));
        records.forEach((record) => {
          if (date > record.expireTime) {
            RollCall.destroy({
              id: record.id
            }).then(() => {

            })
          }
        })
      })
    }, 10000);
  });
};
