/**
 * Record.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    date: { type: 'number', required: true },
    number: { type: 'number' },
    absence: { type: 'number' },
  },

};

