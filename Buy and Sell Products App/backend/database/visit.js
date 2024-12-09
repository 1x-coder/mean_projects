// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const visit = new Schema({
	ad_id:String,
	selleremail:String
});
module.exports=mongoose.model('visit',visit)