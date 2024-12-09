const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const mongoose =require('mongoose');
const fs = require('fs');
const nodemailer = require("nodemailer");


//nodemailer configuration
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manishchahar148@gmail.com',
    pass: 'yourpassword'
  }
});


// connect mongoose to mongodb
mongoose.connect("mongodb://localhost/miniproject",{
useCreateIndex :true,
useNewUrlParser : true
});

// using multer
const multer=require('multer');
const path="./attach";
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })

 let upload = multer({ storage: storage }).single('Image');


//Schema Objects
let adminSignup =require('./database/adminSignup');
let catModel =require('./database/category');
let userSignup =require('./database/userSignup');
let car_bikeModel =require('./database/car_bike');
let visitModel = require('./database/visit');
let likeModel = require('./database/like');
let chatModel = require('./database/chat');
let mob_lapModel = require('./database/mob_lap');


let app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))


// listening to 7000
app.listen(7000,function(){
console.log("listening to port : 7000");
})

// admin Signup
app.post('/api/register_admin',function(req,res) {
	// body...
	let username= req.body.username;
	let email = req.body.email;
	let password = sha1(req.body.password);

	  let ins = new adminSignup({'username':username,'email':email,'password':password})
	  ins.save(function(err){
	   if (err) {
	   	console.log("Error while registering admin");
	   	res.json({'err':1,'msg':'err in registering admin'})
	   }
	   else
	   {
	     console.log('Data saved');
	     res.json({'err':0,'msg':'registered successfully'})
	   }
	  })
	
})


//Admin Login
app.post('/api/admin_login',function(req,res) {
	// body...
	let email= req.body.email;
	let password = sha1(req.body.password);

	
	adminSignup.find({'email':email,'password':password},function(err,data){
		if(err){
			res.json({'msg':'error occured'})
		}
			else if(data.length==0)
			{
				res.json({'err':1,'msg':'Email or password is incorrect'})
			}
			else {
				res.json({'err':0,'msg':'logged in successfully','username':data[0].username,'email':email})
			}
	})
})

//add Category
app.post('/api/add_category',function(req,res)
{
   upload(req,res,function(err)
   {
       if(err){}
       else
       {
           let cname=req.body.catName;
           let description=req.body.catDescription;
           let imgname=req.file.filename;
           let ins=new catModel({'catName':cname,'catDescription':description,'catImg':imgname});
           ins.save(function(err)
           {
               if(err){
               	res.json({"err":0,'msg':'error creating category'})
               }
               else
               {
                   res.json({'err':0,'msg':'category Saved'});
               }
           })
       }
   })
})

//fetch Category

app.use('/images',express.static('attach'));

app.get('/api/fetch_categories',function(req,res){
	catModel.find({},function(err,data){
		if(err){
			res.json({'err':1,'msg':'Error in fetching categories ,api err'})
		}
		else{
			res.json({'err':0,'cdata':data})
		}
	})

})

// send email confirmation otp to user
	
app.post('/api/send_confirmation_otp',function(req,res){
	
	let email= req.body.email;
	let name= req.body.name;

	console.log(email+" "+name);

	let min=100000; 
    let max=999999;  
    let otp = 
    Math.floor(Math.random() * (+max - +min)) + +min; 
    console.log("Random otp  Generated : " + otp );  

	let mailOptions = {             // mail options created
                              from: 'manishchahar148@gmail.com',
                              to: email,
                              subject: "[BUYME] Account Verification",
                              text: "Welcome, "+name+"\n\n"+"Your Account Verification Code is "+otp
                            };

    transporter.sendMail(mailOptions, function(error, info){    //mail sent
                  if (error) {
                    console.log(error);
                    res.json({'err':1})
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.json({'err':0,'otp':otp})
                  }
                });



})

// user Signup
app.post('/api/register_user',function(req,res) {
	// body...
	let username= req.body.name;
	let mobile = req.body.mobile;
	let email = req.body.email;
	let password = sha1(req.body.password);

	  let ins = new userSignup({'username':username,'email':email,'password':password,'mobile':mobile})
	  ins.save(function(err){
	   if (err) {
	   	console.log("Error while registering user");
	   	res.json({'err':1,'msg':'err in registering user'})
	   }
	   else
	   {
	     console.log('Data saved');
	     res.json({'err':0,'msg':' user registered successfully'})
	   }
	  })
	
})

//User Login
app.post('/api/user_login',function(req,res) {
	// body...

	let email= req.body.email;
	let password = sha1(req.body.password);
	console.log(email)
	
	userSignup.find({'email':email,'password':password},function(err,data){
		if(err){
			res.json({'msg':'error occured'})
		}
			else if(data.length==0)
			{
				res.json({'err':1,'msg':'Email or password is incorrect'})
			}
			else {
				res.json({'err':0,'msg':'logged in successfully','username':data[0].username,'email':email,'mobile':data[0].mobile})
			}
	})
})


//post car_bike ad


app.post('/api/post_car_bike',function(req,res)
{

	

   upload(req,res,function(err)
   {
       if(err){}
       else
       {
           let category=req.body.category;
           let mobile = req.body.mobile;
           let state =req.body.state;
           let sold=req.body.sold;
           let premium=req.body.premium;
           let seller=req.body.seller;
           let selleremail=req.body.selleremail;
           let brand=req.body.brand;
           let model= req.body.model;
           let description=req.body.description;
           let year_reg=req.body.year_reg;
           // let kms_driven=req.body.kms_driven;
           let city=req.body.city;
           let locality=req.body.locality;
           let price = req.body.price;
           // let fuel =req.body.fuel;
           let img1= req.body.img1;
           let img2=req.body.img2;



           let ins=new car_bikeModel
           ({
	           	'category':category,
	            'sold':sold,
	            'state':state,
	            'likes':0,
	            'visits':0,
	            'mobile':mobile,
	            'premium':premium,
	            'seller':seller,
	            'selleremail':selleremail,
	            'brand':brand,
	            'model':model,
	            'description':description,
	            'year_reg':year_reg,
	            // 'kms_driven':kms_driven,
	            'city':city,
	            'locality':locality,
	            'price':price,
	            // 'fuel':fuel,
	            'img1':img1,
	            'img2':img2
          });

           ins.save(function(err)
           {
               if(err){
               	console.log(err)
               	res.json({"err":1,'msg':'error in saving '+category+' details'})
               }
               else
               {
                   res.json({'err':0,'msg':category +'Saved'});
               }
           })
       }
   })
})

//post mob_lap ad


app.post('/api/post_mob_lap',function(req,res)
{

	

   upload(req,res,function(err)
   {
       if(err){}
       else
       {
           let category    =	req.body.category;
           let mobile      =    req.body.mobile;
           let state       =	req.body.state;
           let sold        =    req.body.sold;
           let premium     =    req.body.premium;
           let seller      =    req.body.seller;
           let selleremail = 	req.body.selleremail;
           let brand       =	req.body.brand;
           let model       = 	req.body.model;
           let description =	req.body.description;
           let year_reg    =	req.body.year_reg;
           let memory      =	req.body.memory;
           let city        =	req.body.city;
           let locality    =	req.body.locality;
           let price       = 	req.body.price;
           let slots       =	req.body.slots;
           let img1        = 	req.body.img1;
           let img2        =	req.body.img2;



           let ins=new mob_lapModel
           ({
	           	'category':category,
	            'sold':sold,
	            'state':state,
	            'likes':0,
	            'visits':0,
	            'mobile':mobile,
	            'premium':premium,
	            'seller':seller,
	            'selleremail':selleremail,
	            'brand':brand,
	            'model':model,
	            'description':description,
	            'year_reg':year_reg,
	            'memory':memory,
	            'city':city,
	            'locality':locality,
	            'price':price,
	            'slots':slots,
	            'img1':img1,
	            'img2':img2
          });

           ins.save(function(err)
           {
               if(err){
               	console.log(err)
               	res.json({"err":1,'msg':'error in saving '+category+' details'})
               }
               else
               {
                   res.json({'err':0,'msg':category +'Saved'});
               }
           })
       }
   })
})



// fetch car and bikes
app.get('/api/get_car_bikes',function(req,res)
{
	
	let query=car_bikeModel.find().sort({'date_posted':-1});

		    query.exec(function(err,data){
		    if(err){
		      console.log("err in fetchig latest product data");
		      res.json({'err':1,'msg':'err in fetchig  product data'})
		    }
		    else{
		      console.log("products with filter price high to low fetched");
		      res.json({'err':0,'data':data})
		    }
		  });
})


// fetch mob and lap
app.get('/api/get_mob_lap',function(req,res)
{
	
	mob_lapModel.find({},function(err,data){
		if(err){}
			else{
				res.json({'err':0,'data':data})
			}
	})
})

//fetch car_bike preview data
app.post('/api/get_carbike_preview_data',function(req,res) {
	// body...

	let _id= req.body.id;
	
	
	car_bikeModel.find({'_id':_id},function(err,data){
		if(err){
			res.json({'msg':'error occured in fetching car bike data'})
		}
			else if(data.length==0)
			{
				res.json({'err':1,'msg':'Err in fetching car bike data'})
			}
			else {
				res.json({'err':0,'msg':'car bike fetch success','cbData':data})
			}
	})
})

//fetch my ads
app.post('/api/fetch_my_ads',function(req,res){

	let selleremail=req.body.email;

	car_bikeModel.find({'selleremail':selleremail}, function(err,data){
		if(err){
			res.json({'msg':'some database err in fetching your ads'})
		}
		else if(data.length==0){
			res.json({'err':1,'msg':'err in fetching my ads'})
		}

		else{
			res.json({'err':0,'msg':'my ads fetched successfully','myads':data})
		}
	})
})

//count visits car_bike
app.post('/api/count_visits',function(req,res){

	let selleremail=req.body.email;
	let ad_id = req.body.id;


	visitModel.find({'selleremail':selleremail,'ad_id':ad_id}, function(err,data){
		if(err){
			res.json({'msg':'some database err '})
		}
		else if(data.length==0){

			let ins=new visitModel
           ({
	         'selleremail':selleremail,
	         'ad_id':ad_id
          });


            ins.save(function(err)
           {
               if(err){
               	console.log(err)
               }
               else
               {
                   
	               	visitModel.find({'ad_id':ad_id}, function(err,data){
						if(err){
							console.log(err)
						}
						else if(data.length==0){
							console.log('some operation relarted to visits')
						}

						else{

								let visit=data.length;
								console.log(visit)

								//
								car_bikeModel.update({'_id':ad_id},{$set:{'visits':visit}},function(err){
						                  if(err){
						                      console.log(" ERR INsetting visits");
						                          }
						                     else{
						                        console.log(" visit updated successfully");
						                          }
						                    })
								//							
							}
								})

               }
           })

		}

		else{
			console.log('visit already exist')
		}
	})	
})

//count likes car_bike
app.post('/api/count_likes',function(req,res){

	let selleremail=req.body.email;
	let ad_id = req.body.ad_id;


	likeModel.find({'selleremail':selleremail,'ad_id':ad_id}, function(err,data){
		if(err){
			res.json({'msg':'some database err '})
		}
		else if(data.length==0){

			let ins=new likeModel
           ({
	         'selleremail':selleremail,
	         'ad_id':ad_id
          });


            ins.save(function(err)
           {
               if(err){
               	console.log(err)
               }
               else
               {
                   
	               	likeModel.find({'ad_id':ad_id}, function(err,data){
						if(err){
							console.log(err)
						}
						else if(data.length==0){
							console.log('some operation relarted to likes')
						}

						else{

								let like_count=data.length;
								console.log("like = "+like_count)

								//
								car_bikeModel.updateOne({'_id':ad_id},{$set:{'likes':like_count}},function(err){
						                  if(err){
						                      console.log(" ERR INsetting likes");
						                          }
						                     else{
						                        console.log(" likes updated successfully");
						                          }
						                    })
								//							
							}
								})

               }
           })

		}

		else{
			console.log('like already exist')
		}
	})	
})


// delete myad car bike

app.post('/api/deletead_carbike',function(req,res){
  let _id=req.body._id;

  let selleremail=req.body.email;

  car_bikeModel.deleteOne({'_id':_id},function(err){
    if(err){
      res.json({'err':1,'msg':'error in deleting ad'});
      console.log(err)
    }
    else{
      
    		

				car_bikeModel.find({'selleremail':selleremail}, function(err,data){
					if(err){
						res.json({'msg':'some database err in fetching your ads'})
						console.log(err)
					}
					else if(data.length==0){
						res.json({'err':1,'msg':'err in fetching my ads'})
					}

					else{
						res.json({'err':0,'msg':'my ads deleted successfully','myads':data})
					}
				})

    }
  })
})

//fetch user profile
app.post('/api/get_user_profile',function(req,res){

	let email=req.body.email;

	userSignup.find({'email':email}, function(err,data){
		if(err){
			res.json({'msg':'some database err in fetching your profile of user'})
		}
		else if(data.length==0){
			res.json({'err':1,'msg':'err in fetching user profile'})
		}

		else{
			res.json({'err':0,'msg':' user profile fetched successfully','profile':data})
		}
	})
})


//fetch user profile
app.post('/api/update_user_profile',function(req,res){

	let email=req.body.email;
	let username = req.body.name;
	let dob = req.body.dob;
	let mobile =req.body.mobile;
	let locality =req.body.locality;
	let city =req.body.city;
	let img =req.body.img;

	userSignup.updateOne({'email':email},{$set:{'username':username,'dob':dob,'mobile':mobile,'locality':locality,'city':city,'img':img}},function(err){
		if(err){
			console.log(" ERR IN updating  user profile");
						                          }
		else{
			console.log(" likes updated successfully");
			}
		})

	userSignup.find({'email':email}, function(err,data){
		if(err){
			res.json({'msg':'some database err in fetching your profile of user'})
		}
		else if(data.length==0){
			res.json({'err':1,'msg':'err in fetching user profile'})
		}

		else{
			res.json({'err':0,'msg':' user profile fetched successfully','profile':data})
		}
	})
})



// saving chats
app.post('/api/save_chats',function(req,res) {
	// body...
	let message= req.body.message;
	let sender = req.body.sender;
	let receiver = req.body.receiver;

	  let ins = new chatModel({'message':message,'sender':sender,'receiver':receiver})
	  ins.save(function(err){
	   if (err) {
	   	console.log("Error while saving chats");
	   	res.json({'err':1,'msg':'err in saving chats'})
	   }
	   else
	   {
	     console.log('chats saved');
	     res.json({'err':0,'msg':'sent successfully'})
	   }
	  })
	
})

//fetch current user chats
app.post('/api/fetch_chats_my',function(req,res){

	let sender=req.body.sender;
	let receiver=req.body.receiver;
 
	chatModel.find({ $or: [ { 'sender': sender,'receiver':receiver }, { 'sender':receiver,'receiver':sender } ] } , function(err,data){
		if(err){
			res.json({'msg':'some database err in fetching chats'})
		}
		else if(data.length==0){
			res.json({'err':1,'msg':'no messages found from my side'})
		}

		else{
			res.json({'err':0,'msg':'mySide messages fetched successfully','myChat':data})
		}
	})
})


//get chat request
app.post('/api/get_req',function(req,res){

	let myemail=req.body.email;
	

	chatModel.find({'receiver':myemail}, function(err,data){
		if(err){
			res.json({'msg':'some database err in fetching chats req'})
		}
		else if(data.length==0){
			res.json({'err':1,'msg':'err in fetching chats req'})
		}

		else{
			res.json({'err':0,'msg':' chats req fetched successfully','chats_req':data})
		}
	})
})



//fetch products according to filter
app.post('/api/filter_main',function(req,res){

	let option=req.body.option;
	console.log(option)	
	if(option==0)
	{
		
		let query=car_bikeModel.find().sort({'price':1});

		    query.exec(function(err,data){
		    if(err){
		      console.log("err in fetchig latest product data");
		      res.json({'err':1,'msg':'err in fetchig  product data'})
		    }
		    else{
		      console.log("products with filter price low to high fetched");
		      res.json({'err':0,'filterData':data})
		    }
		  });
	}
	if(option==1)
	{
		
		let query=car_bikeModel.find().sort({'price':-1});

		    query.exec(function(err,data){
		    if(err){
		      console.log("err in fetchig latest product data");
		      res.json({'err':1,'msg':'err in fetchig  product data'})
		    }
		    else{
		      console.log("products with filter price high to low fetched");
		      res.json({'err':0,'filterData':data})
		    }
		  });
	}

	if(option==2)
	{
		
		let query=car_bikeModel.find().sort({'date_posted':1});

		    query.exec(function(err,data){
		    if(err){
		      console.log("err in fetchig latest product data");
		      res.json({'err':1,'msg':'err in fetchig  product data'})
		    }
		    else{
		      console.log("products with filter price high to low fetched");
		      res.json({'err':0,'filterData':data})
		    }
		  });
	}

	if(option==3)
	{
		
		let query=car_bikeModel.find().sort({'date_posted':-1});

		    query.exec(function(err,data){
		    if(err){
		      console.log("err in fetchig latest product data");
		      res.json({'err':1,'msg':'err in fetchig  product data'})
		    }
		    else{
		      console.log("products with filter price high to low fetched");
		      res.json({'err':0,'filterData':data})
		    }
		  });
	}



})



