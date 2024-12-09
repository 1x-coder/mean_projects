var express = require('express');
var router = express.Router();
var path = require('path')
const passport = require('passport');
const multer = require('multer');
const imageHandler = require('../utilities/ImageHandler');
const { memoryStorage } = require('multer');

var restaurantService = require('../service/restaurants');

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

// route to check if restaurant data is available
router.get('/', function (req, res, next) {
    restaurantService.testFunction().then((data) => {
        if (data) {
            res.send('welcome to restaurant route');
        } else {
            let err = new Error('No records found');
            err.status = 404;
            throw err; // throws error if no data for restaurant is found
        }
    }).catch(err => next(err))
});

//to test food db
router.get('/testfoodDB', function (req, res, next) {
  restaurantService.testFunctionFood().then((data) => {
      if (data) {
          res.send('welcome to food route');
      } else {
          let err = new Error('No records found');
          err.status = 404;
          throw err; // throws error if no data for restaurant is found
      }
  }).catch(err => next(err))
});


router.post('/register',upload.single('restaurantPhoto') ,async(req,res,next)=>{
    console.log("I am here 1")
    let restaurantObj = req.body
    
  
//upload image
  if (req.file){
    // new_customer.profilePic= req.file.originalname
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    restaurantObj.restaurantPhoto= filename;
    await imageHandler(req,'restaurant/').catch((err)=>next(err))
  }
 //to register restaurant

  restaurantService.register(restaurantObj).then(data => {
    
    if (data) {
      res.send(data);
    } else {
      let err = new Error('registration failed!');
      err.status = 500; // internal server error
      throw err;
    }
  }).catch(err => next(err))
  });


  


  //login of restaurants
  router.post("/login",async(req,res,next)=>{
    let contact = req.body.contact
    let password = req.body.password
    
    return restaurantService.login(contact,password).then(data=>{
      if(data){
        res.send(data);
      
      }else{
        let err=new Error('No such user found!To Sign-in Register First');
        err.status=500;
        throw err;
      }
    }).catch(err=>next(err))
  })
//to view restaurant profile
router.get("/viewRestaurantProfile", passport.authenticate('restaurant', {session:false}), (req, res, next)=>{
 
  return restaurantService.viewRestaurantProfile(req.user._id).then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})
//to get restaurant Image
router.get('/getRestaurantImage', passport.authenticate('restaurant', {session: false}) ,(req, res, next)=>{
  let imageName = req.user.restaurantPhoto;
  res.sendFile(path.join(__dirname+'/../'+'uploads/'+'images/'+'restaurant/'+imageName))
});

  //to update restaurant profile

  
router.put('/updateRestaurantProfile', passport.authenticate('restaurant', {session: false}) , upload.single('restaurantPhoto') , async (req, res, next)=>{
  let new_details = req.body
 
  if (req.file){
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    new_details.restaurantPhoto= filename;
    await imageHandler(req,'restaurant/').catch((err)=>next(err))
  }
  return restaurantService.updateRestaurantProfile(req.user._id, new_details).then((data)=>{
    if(data){
      
      res.json(req.user)
    }else{
      let err=new Error("Sorry! Unable to update data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=> next(err))
})
 

  //to add food items
  router.post('/addFood', passport.authenticate('restaurant', {session: false}), upload.single('img') ,async(req,res,next)=>{
  let foodObj=req.body
  
  if (req.file){
    // new_customer.profilePic= req.file.originalname
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    foodObj.img= filename;
    await imageHandler(req,'food/').catch((err)=>next(err))
  }
  return restaurantService.addMenu(foodObj).then(data=>{
    if(data){
      res.send(data);
      
    }else{
      let err=new Error("Item Not added in Menu, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})

//to get food Image
router.get('/getFoodImage/:foodImg', (req, res, next)=>{
  let imageName=req.params.foodImg
  console.log(imageName)
  res.sendFile(path.join(__dirname+'/../'+'uploads/'+'images/'+'food/'+imageName))
});

//to get food Details using restaurant Id
router.get('/getFoodDetails',passport.authenticate('restaurant', {session: false}) ,(req, res, next)=>{
  let restId=req.user.restaurantId
  return restaurantService.viewMenu(restId).then((data)=>{
    if(data){
      console.log(data)
      res.send(data)
    }else{
      let err=new Error("Sorry! Unable to fetch data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))

})

router.get('/getFoodByFoodId/:foodId',passport.authenticate('restaurant', {session: false}) ,(req, res, next)=>{
  let foodId=req.params.foodId
  return restaurantService.foodD(foodId).then((data)=>{
    if(data){
      console.log(data)
      res.send(data)
    }else{
      let err=new Error("Sorry! Unable to fetch data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))

})

//to update food items
router.put("/updateFood",passport.authenticate('restaurant', {session: false}), upload.single('img'), async(req,res,next)=>{
  console.log(req.body)
  console.log(req.file)
  let foodObj=req.body;
  
  if (req.file){
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    foodObj.img= filename;
    await imageHandler(req,'food/').catch((err)=>next(err))
  }
  
  
  return restaurantService.updateMenu(foodObj).then(data=>{
    if(data){
      res.json("Food Item with Id:"+foodObj.foodId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to update data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})

//delete food Item
router.delete("/deleteFood/:foodId",passport.authenticate('restaurant', {session: false}),async(req,res,next)=>{
  let restaurantId=req.user.restaurantId
  let foodId=req.params.foodId
  
  
  return restaurantService.deleteMenu(restaurantId,foodId).then(data=>{
    if(data){
      res.send("Food Item with Id:"+foodId+" is deleted.")
    }else{
      let err=new Error("Sorry! Unable to delete data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})
//update ambience
router.put("/addAmbience",passport.authenticate('restaurant', {session: false}),async(req,res,next)=>{
  let restaurantId=req.user._id
  let restaurantAmbience=req.body.restaurantAmbience
  return restaurantService.addAmbience(restaurantId,restaurantAmbience).then(data=>{
    if(data.nModified){
      res.send("Ambience Images of Restaurant Id:"+restaurantId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to update pictures, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})

router.put("/deleteAmbience", passport.authenticate('restaurant', {session: false}),async(req,res,next)=>{
  let restaurantId=req.user._id
  let restaurantAmbience=req.body.restaurantAmbience
  console.log(restaurantAmbience)
  return restaurantService.deleteAmbience(restaurantId,restaurantAmbience).then(data=>{
   
    if(data.nModified>0){
      res.send("Ambience Images of Restaurant Id:"+restaurantId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to delete pictures, Try again!")
      err.status=404;
      throw err;
    }
  }).catch(err=>next(err))
})
//get orders from customer using restaurantId
router.get("/getOrders",passport.authenticate('restaurant', {session: false}),async(req,res,next)=>{
  let restaurantId=req.user.restaurantId
  
  return restaurantService.getOrders(restaurantId).then((data)=>{
    if(data){
      console.log(data)
      res.send(data)
    }else{
      let err=new Error("Sorry! Unable to fetch orders, Try again!")
      err.status=404;
      throw err;
    }
    
  }).catch(err=>next(err))
})
//to change the order status
router.put("/changeOrderState/:orderId/:status",passport.authenticate('restaurant', {session: false}),async(req,res,next)=>{
   let orderId=req.params.orderId
   let status=req.params.status
   return restaurantService.changeOrderState(orderId,status).then((data)=>{
    if(data){
      res.send(data)
    }else{
      let err=new Error("Sorry! Unable to Change Status, Try again!")
      err.status=500;
      throw err;
    }
    
  }).catch(err=>next(err))
})


module.exports = router;