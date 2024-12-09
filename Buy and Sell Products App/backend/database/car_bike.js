// car_bike Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const car_bike = new Schema({
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
	            // kms_driven:Number,
	            city:String,
	            locality:String,
	            price:Number,
	            // fuel:String,
	            img1:String,
	            img2:String,
	            date_posted :{type:Date, default:Date.now}
});
module.exports=mongoose.model('car_bike',car_bike)