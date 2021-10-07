var Web3 = require('web3');
var fs = require('fs');
const EthereumTx = require('ethereumjs-tx').Transaction;
var config = require('./RollCallEthConfig');

class RollCallEthApi {
  /**
   * 初始化web3客户端
   */
  constructor() {
    this.contractAddress = config.contractAddress;
    this.gasPrice = config.gasPrice;
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.infuraHttps));
    this.web3.eth.defaultAccount = config.account;
    //注意在测试文件和app.js文件中路径不一样
    this.abi = JSON.parse(fs.readFileSync(
      config.contractPath
    ).toString());
    this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
  }

  /**
   * 获取当前账户已经发布的交易数
   * @returns {Promise<number>}
   */
  getNonce() {
    //调用合约的以太坊账户
    var nonce = this.web3.eth.getTransactionCount(config.account);
    return nonce;
  }

  /**
   * 改变以太坊状态并查询gas
   * @param opFunction
   * @returns {PromiEvent<TransactionReceipt>}
   */
  operateEthStatus(opFunction) {
    var nonce = global.getNextNonce();
    const privateKey = Buffer.from(config.privateKey,
      'hex');
    //交易对象
    var rawTx = {
      nonce: nonce,
      gasPrice: this.web3.utils.toHex('10000000000'),
      gasLimit: this.web3.utils.toHex('3000000'),
      to: this.contractAddress,
      value: '0x00',
      data: opFunction,
      chainId: 4
    };
    var tx = new EthereumTx(rawTx ,{ chain: 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    return this.web3.eth.sendSignedTransaction('0x' +
      serializedTx.toString('hex'));
  }

  /**
   * 添加签到学生
   * @param date
   * @param content
   * @returns {*}
   */
  addInStudent(date, content) {
    var addInStudentAbi = this.contract.methods.addInStudent(date, content).encodeABI();
    return this.operateEthStatus(addInStudentAbi);
  }

  /**
   * 添加缺席学生
   * @param date
   * @param content
   * @returns {PromiEvent<TransactionReceipt>}
   */
  addAbsStudent(date, content) {
    var addAbsStudentApi = this.contract.methods.addAbsStudent(date, content).encodeABI();
    return this.operateEthStatus(addAbsStudentApi);
  }

  /**
   * 添加学生列表
   * @param id
   * @param name
   * @param classes
   * @param teacher
   * @returns {PromiEvent<TransactionReceipt>}
   */
  addStudent(id, name, classes, teacher) {
    var addStudentApi =
      this.contract.methods.addStudent(id, name, classes, teacher).encodeABI();
    return this.operateEthStatus(addStudentApi);
  }

  /**
   * 删除学生
   * @param id
   * @returns {PromiEvent<TransactionReceipt>}
   */
  deleteStudent(id) {
    var deleteStudentApi =
      this.contract.methods.deleteStudent(id).encodeABI();
    return this.operateEthStatus(deleteStudentApi);
  }

  /**
   * 设置所有学生
   * @param content
   * @returns {PromiEvent<TransactionReceipt>}
   */
  setAllStudents(content) {
    var setAllStudentsApi =
      this.contract.methods.setAllStudents(content).encodeABI();
    return this.operateEthStatus(setAllStudentsApi);
  }

  /**
   * 更新单个学生
   * @param id
   * @param name
   * @param classes
   * @param teacher
   * @returns {PromiEvent<TransactionReceipt>}
   */
  updateStudent(id, name, classes, teacher) {
    var updateStudentApi =
      this.contract.methods.updateStudent(id, name, classes, teacher).encodeABI();
    return this.operateEthStatus(updateStudentApi);
  }

  /**
   * 查询到位学生
   * @param date
   * @returns {Promise<unknown>}
   */
  selectInStudent(date) {
    var selectInStudentApi = this.contract.methods
      .selectInStudent(date).encodeABI();
    var _that = this;
    return new Promise(function (resolve, reject) {
      _that.web3.eth.call({
        to: _that.contractAddress,
        data: selectInStudentApi
      }).then((res) => {
        var result =  _that.web3.eth.abi.decodeParameter('string', res);
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * 查询缺席学生
   * @param date
   * @returns {Promise<unknown>}
   */
  selectAbsStudent(date) {
    var selectAbsStudentApi = this.contract.methods
      .selectAbsStudent(date).encodeABI();
    var _that = this;
    return new Promise(function (resolve, reject) {
      _that.web3.eth.call({
        to: _that.contractAddress,
        data: selectAbsStudentApi
      }).then((res) => {
        var result =  _that.web3.eth.abi.decodeParameter('string', res);
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * 根据id查询name
   * @param id
   * @returns {Promise<unknown>}
   */
  selectOneStudentName(id) {
    var selectOneStudentNameApi = this.contract.methods
      .selectOneStudentName(id).encodeABI();
    var _that = this;
    return new Promise(function (resolve, reject) {
      _that.web3.eth.call({
        to: _that.contractAddress,
        data: selectOneStudentNameApi
      }).then((res) => {
        var result =  _that.web3.eth.abi.decodeParameter('string', res);
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  // /**
  //  * 查询交易状态
  //  * @param hash
  //  * @returns {null|number} 1：成功，0：失败，null：未处理
  //  */
  // queryTransactionStatus(hash) {
  //   var _that = this;
  //   return new Promise((resolve, reject) => {
  //     _that.web3.eth.getTransactionReceipt(hash)
  //       .then((res) => {
  //         resolve(res);
  //       });
  //   });
  // }

}

module.exports = RollCallEthApi;
