var express = require('express');
var router = express.Router();
const multer = require('multer');
var customerService = require('../service/customers');
const imageHandler = require('../utilities/ImageHandler');
const { memoryStorage } = require('multer');
const path = require('path');
const passport = require('passport');
const custSchema =require("../model/custObj");
const Order = require('../model/Order')
const { route } = require('./admin');
// const customerModel = require('../model/customers');

let upload= multer({ // creating upload middleware
  storage: memoryStorage(), 
  fileFilter: (req, file, cb) =>{
      //  limiting file types using extensions
      if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
          cb(null, true)
      }else{
          let err= new Error('Invalid file type.')
          err.status= 400
          cb(err , false)
      }
  }
})
  


// route to check if customer data is available
router.get('/', function (req, res, next) {
  customerService.testFunction().then((data) => {
    if (data) {
      res.send('welcome to customer route');
    } else {
      let err = new Error('No records found');
      err.status = 404;
      throw err; // throws error if no data for customer is found
    }
  }).catch(err => next(err))
});

// using upload middleware to store file in server
router.post('/register', upload.single('profilePic') , async (req, res, next)=>{
  let new_customer = new custSchema(req.body);
  if (req.file){
    // new_customer.profilePic= req.file.originalname
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    new_customer.profilePic= filename;
    await imageHandler(req,'customer/').catch((err)=>next(err))
  }
  return customerService.register_user(new_customer).then((user)=>{
      res.json(user)
  }).catch(err=> next(err))
})


router.post('/login', (req, res, next)=>{
let contact = req.body.contact
let password = req.body.pass
return customerService.login_user(contact, password).then((data)=>{
  res.json(data)
}).catch(err=>next(err))
})

router.get('/getProfileImage/', passport.authenticate('customer', {session: false}) ,(req, res, next)=>{
   let imageName = req.user.profilePic;
   res.sendFile(path.join(__dirname+'/../'+'uploads/'+'images/'+'customer/'+imageName))
});

router.get('/getRestaurantImage/:image_name' ,(req, res, next)=>{
  let imageName = req.params.image_name;
  res.sendFile(path.join(__dirname+'/../'+'uploads/'+'images/'+'restaurant/'+imageName))
});

router.get('/getFoodImage/:image_name' ,(req, res, next)=>{
  let imageName = req.params.image_name;
  res.sendFile(path.join(__dirname+'/../'+'uploads/'+'images/'+'food/'+imageName))
});

router.get('/viewRestaurants/', passport.authenticate('customer', {session:false}), (req, res, next)=>{
  return customerService.get_all_restuarants().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/filterRestaurant/:keyword', (req, res, next)=>{
  let keyword = req.params.keyword
  return customerService.filter_restuarants(keyword).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/detailsOfRestaurant/:id', (req, res, next)=>{
  let id = req.params.id
  return customerService.get_restuarant_detail(id).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/detailsOfFood/:id', (req, res, next)=>{
  let id = req.params.id
  return customerService.get_food_detail(id).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/viewOrders/', passport.authenticate('customer', {session:false}), (req, res, next)=>{
  return customerService.view_orders(req.user.customerId).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.put('/updateAddress/', passport.authenticate('customer', {session: false}), (req, res, next)=>{
  let new_address = req.body.new_address
  return customerService.update_address(req.user._id, new_address).then((data)=>{
    res.send(data)
  }).catch(err=>next(err))
})


router.put('/cancelOrders/:orderId', passport.authenticate('customer', {session: false}), (req, res, next)=>{
  let order_id = req.params.orderId
  return customerService.cancel_orders(order_id).then((data)=>{
    res.send(data)
  }).catch(err=>next(err))
})


router.put('/updateProfile', passport.authenticate('customer', {session: false}) , upload.single('profilePic') , async (req, res, next)=>{
  let new_details = new custSchema(req.body)
  if (req.file){
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    new_details.profilePic= filename;
    await imageHandler(req,'customer/').catch((err)=>next(err))
  }
  return customerService.update_profile(req.user._id, new_details).then((data)=>{
      res.json(req.user)
  }).catch(err=> next(err))
})


router.post('/placeOrder', (req,res,next)=>{
  let new_order= new Order(req.body)
  return customerService.place_order(new_order).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})


router.get('/getFoodName/:food_id', passport.authenticate('customer', {session:false}), (req,res,next)=>{
  return customerService.get_food(req.params.food_id).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/getRestaurantName/:rest_id', passport.authenticate('customer', {session:false}), (req,res,next)=>{
  return customerService.get_restaurant_name(req.params.rest_id).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/Restaurant/:id', passport.authenticate('customer', {session:false}),(req, res, next)=>{
  let id = req.params.id
  return customerService.get_restuarant(id).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.delete('/cancel/:oId', passport.authenticate('customer', {session:false}), (req, res, next)=>{
  var del =req.params.oId
  // var bel=req.params.bel
  return customerService.cancel(del).then((data)=>{
    res.send("Order with id"+del+"is deleted")
  }).catch(err=>next(err))
})

module.exports = router;
