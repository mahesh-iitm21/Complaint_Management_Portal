const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    resp: {
        type: String,
        required: true,
        default: "a"
    },
    //linking user to post
    user: {
        //type is object id which is unique
        type: moongose.Schema.Types.ObjectId,
        //ref= schema name
        ref: 'user'
    }

}, {
    //stores Created at and Updated at time and date 
    timestamps: true
});

const complaint = moongose.model('complaint', complaintSchema)

module.exports = complaint;