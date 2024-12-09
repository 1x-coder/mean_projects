// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSignup = new Schema({
	username:String,
	mobile:String,
	email:{type:String,unique:true},
	password : String,
	locality:{type:String,default:'NA'},
	city:{type:String,default:'NA'},
	img:{type:String,default:'NA'},
	dob:{type:Date,default:Date.now},
	user_since:{type:Date,default:Date.now}
});
module.exports=mongoose.model('userSignup',userSignup)