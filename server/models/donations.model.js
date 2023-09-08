const  mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  totalCash: {type: Number, required: true},
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
})

module.exports = mongoose.model('donation', donationSchema);
