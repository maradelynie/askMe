const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');


let schema = mongoose.Schema({
  userId: {
    type: String,
    required: true
},
  category: {
    type: String,
    required: true
},
  questions: [{
    questionId: String, 
    selectedItem: String,
    difficulty: String,
    result: Boolean,
    timeStamp:{type: Date, default: Date.now }
  }]
});

const testRecords = mongoose.model('testRecords', schema);

module.exports = testRecords;
