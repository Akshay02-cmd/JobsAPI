const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide the name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide the email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid property",
    ],
    unique:true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "please provide the name"],
    minlength: 6
  },
});

UserSchema.pre('save',async function(next){
  //code
})

module.exports = mongoose.model('User',UserSchema);
