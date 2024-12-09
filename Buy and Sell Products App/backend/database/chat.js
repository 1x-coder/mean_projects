// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chat = new Schema({
	message:String,
	sender:String,
	receiver : String,
	date:{type:Date,default:Date.now}
});
module.exports=mongoose.model('chat',chat)