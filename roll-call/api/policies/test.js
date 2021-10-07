module.exports = async function (req, res, proceed) {
  if (req.me) {
    return proceed();
  }
  // select id, name from student where id not in (select number from record where date = 1)
  return res.forbidden();

};
