// 主合约的测试用例
/**
 * 初始化全局主键和主键查询函数
 * @param nonce
 */
function initGlobal(nonce) {
  global.nonce = --nonce;
  global.getNextNonce = function () {
    global.nonce++;
    return '0x' + global.nonce.toString(16);
  }
}

var Database = require('../RollCallEthApi');

// 初始化database
var database = new Database();



database.getNonce().then((res) => {
    initGlobal(res);
    //初始化后启动测试
    testEthDb();
}, (err) => {
    initGlobal(0);
    console.log(err);
});

/**
 * 测试查询状态
 */
function testQueryTransactionStatus() {
    database.queryTransactionStatus('0xb54c1c61b9274d7fd659d241e84ddeefc5a84d6880ec6d6da16c642c23741e83')
        .then((res) => {
            console.log(res);
        });
}

/**
 * 测试添加签到学生
 */
function testAddInStudent() {
  var date = Math.floor(Math.random() * 100000);
  var content = Math.random().toString(36).substr(2);
  console.log(date);
  console.log(content);
  database.addInStudent(date, content).then((res) => {
    console.log(res);
  })
}

/**
 * 测试查询签到学生
 */
function testSelectInStudent() {
  var date = 72089;
  database.selectInStudent(date).then((res) => {
    console.log("-----")
    console.log();
  })
}


/**
 * 测试添加未签到学生
 */
function testAddAbsStudent() {
  var date = Math.floor(Math.random() * 100000);
  var content = Math.random().toString(36).substr(2);
  console.log(date);
  console.log(content);
  database.addAbsStudent(date, content).then((res) => {
    console.log(res);
  })
}

/**
 * 测试查询未签到学生
 */
function testSelectAbsStudent() {
  var date = 64842;
  database.selectAbsStudent(date).then((res) => {
    console.log(res);
  })
}

/**
 * 测试添加学生
 */
function testAddStudent() {
  var id = Math.floor(Math.random() * 100000);
  var name = Math.random().toString(36).substr(2);
  var classes = Math.floor(Math.random() );
  var teacher = Math.floor(Math.random());
  console.log(id, name, classes, teacher);
  database.addStudent(id, name, classes, teacher).then((res) => {
    console.log(res);
  })
}

/**
 * 测试更新学生
 */
function testUpdateStudent() {
  var id = 73291;
  var name = Math.random().toString(36).substr(2);
  var classes = Math.floor(Math.random() );
  var teacher = Math.floor(Math.random());
  console.log(id, name, classes, teacher);
  return database.updateStudent(id, name, classes, teacher).then((res) => {
    console.log(res);
  });
}

/**
 * 测试删除学生
 */
function testDeleteStudent() {
  var id = 73291;
  database.deleteStudent(id).then((res) => {
    console.log(res);
  })
}

function testSelectOneStudentName() {
  var id = 73291;
  return database.selectOneStudentName(id).then((res) => {
    console.log(res);
  })
}


/**
 * 测试主函数
 */
function testEthDb() {
  // testAddInStudent();
  testSelectInStudent();
  // testAddAbsStudent();
  // testSelectAbsStudent();

  // testAddStudent();

  // testSelectOneStudentName().then((res) => {
  //   testUpdateStudent().then((res) => {
  //     testSelectOneStudentName();
  //   })
  // });

  // testDeleteStudent();


}

