const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//const productSchema = require('./productModel').Schema;
const schemaOptions = {
  strict: false,
  timestamps: true,
};
const userSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    specialization:{
      type: String,
      unique: true,
      required: false,
    },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:5},

  },
    {
    strict: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
