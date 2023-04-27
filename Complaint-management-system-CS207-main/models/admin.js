const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

}, {
  //stores Created at and Updated at time and date 
  timestamps: true
});

const admin = moongose.model('admin', adminSchema)

module.exports = admin;