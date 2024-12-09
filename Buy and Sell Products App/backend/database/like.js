// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const like = new Schema({
	ad_id:String,
	selleremail:String
});
module.exports=mongoose.model('like',like)