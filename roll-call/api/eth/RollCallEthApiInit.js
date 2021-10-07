// 主合约的测试用例

var Database = require('./RollCallEthApi');

// 初始化database
database = new Database();

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

function testEthDb() {
  console.log("初始化区块链测试网络成功！");
}

database.getNonce().then((res) => {
  initGlobal(res);
  //初始化后启动测试
  testEthDb();
}, (err) => {
  initGlobal(0);
  console.log(err);
});

module.exports = {
  database: database
};

