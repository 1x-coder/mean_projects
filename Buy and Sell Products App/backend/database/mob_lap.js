// mob_lap Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mob_lap = new Schema({
				category:String,
	            sold:Boolean,
	            mobile:Number,
	            state:Boolean,
	            likes:Number,
	            visits:Number,
	            premium:Boolean,
	            seller:String,
	            selleremail:String,
	            brand:String,
	            model:String,
	            description:String,
	            year_reg:Number,
	            // memory:String,
	            city:String,
	            locality:String,
	            price:Number,
	            // slots:String,
	            img1:String,
	            img2:String,
	            date_posted :{type:Date, default:Date.now}
});
module.exports=mongoose.model('mob_lap',mob_lap)