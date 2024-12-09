// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category = new Schema({
	catName:{ type:String, unique:true},
	catDescription:{type:String},
	catImg : String
});
module.exports=mongoose.model('category',category)