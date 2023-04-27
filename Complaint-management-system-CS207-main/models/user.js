const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  room_num: {
    type: Number,
    required: true
  },
  hostel: {
    type: String,
    required: true
  },
  roll_no: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: "user"
  },
  // googleId : String,
  complaint: [
    {
      //type is object id which is unique
      type: moongose.Schema.Types.ObjectId,
      //ref= schema name
      ref: 'complaint'
    }
  ]

}, {
  //stores Created at and Updated at time and date 
  timestamps: true
});

const user = moongose.model('user', userSchema)

module.exports = user;