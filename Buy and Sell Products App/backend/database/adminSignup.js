// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSignup = new Schema({
	username:String,
	email:{type:String,unique:true},
	password : String
});
module.exports=mongoose.model('adminSignup',adminSignup)