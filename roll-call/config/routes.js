/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  // Login
  'POST /v1/login': {
    controller: 'login',
    action: "doLogin"
  },

  // Student
  'PUT /v1/student/update': {
    controller: 'student',
    action: "updateStudent"
  },
  'POST /v1/student/add': {
    controller: 'student',
    action: "addStudent"
  },
  'DELETE /v1/student/delete': {
    controller: 'student',
    action: "deleteStudent"
  },
  'GET /v1/student/select/all': {
    controller: 'student',
    action: "selectAllStudent"
  },

  // RollCall
  'POST /v1/rollcall/publish': {
    controller: 'rollCall',
    action: "publish"
  },
  'GET /v1/rollcall/select': {
    controller: 'rollCall',
    action: "select"
  },

  // Record
  'POST /v1/record/add': {
    controller: 'record',
    action: "addRecord"
  },
  'GET /v1/record/select': {
    controller: 'record',
    action: "selectRecord"
  },
  'GET /v1/record/select/date': {
    controller: 'record',
    action: "selectDate"
  },
  'GET /v1/record/select/absence': {
    controller: 'record',
    action: "selectAbsence"
  },

  // Test
  'GET /test': {
    controller: 'test',
    action: "test"
  },

};
