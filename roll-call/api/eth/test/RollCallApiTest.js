let api = require('../RollCallEthApiInit').database;

setTimeout(() => {
  api.addInStudent(123324, "contents").then((res) => {
    console.log(res)
  })
}, 5000);
