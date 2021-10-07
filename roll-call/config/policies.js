/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  // login
  'login/doLogin': true,

  // record
  'record/addRecord': true,
  'record/selectRecord': 'loginAccess',
  'record/selectDate': 'loginAccess',

  // student
  // 'student/*': 'loginAccess',

  // rollcall
  'rollcall/publish': 'loginAccess',
  'rollcall/select': true,

  // test
  'test/*': 'loginAccess'


};
