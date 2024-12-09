var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer')
const imageHandler = require('../utilities/ImageHandler');
const passport = require('passport')
const deliveryPersonObject = require('../model/delivery-personObj')

//for image handling
let storage = multer.memoryStorage();
let upload = multer({ storage })

var deliveryPersonService = require('../service/delivery-persons');
const deliveryPersonModel = require('../model/delivery-persons');

// route to check if delivery-person data is available
router.get('/', function (req, res, next) {
  deliveryPersonService.testFunction().then((data) => {
    if (data) {
      res.send('welcome to delivery person route');
    } else {
      let err = new Error('No records found');
      err.status = 404;
      throw err; // throws error if no data for delivery-person is found
    }
  }).catch(err => next(err))
});

// for delivery person to register
router.post('/register', upload.single('deliveryPersonImage'), async (req, res, next) => {
  let deliveryPersonObj = req.body
  if (req.file) {
    // new_customer.profilePic= req.file.originalname
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    deliveryPersonObj.deliveryPersonImage = filename;
    await imageHandler(req, 'delivery-person/').catch((err) => next(err))
  }
  deliveryPersonObj = new deliveryPersonObject(deliveryPersonObj)
  deliveryPersonService.register(deliveryPersonObj).then(data => {
    if (data) {
      res.json({
        'message': 'registerd successfully!'
      });
    } else {
      let err = new Error('registration failed!');
      err.status = 500; // internal server error
      throw err;
    }
  }).catch(err => next(err))
})

// for delivery person to login
router.post('/login', (req, res, next) => {
  let credentials = req.body;
  deliveryPersonService.login(credentials).then(data => {
    if (data) {
      res.json(data)
    }
    else {
      let err = new Error('Invalid Credentials');
      err.status = 403; // forbidden error
      throw err;
    }
  }).catch(err => next(err))
})

// to get delivery-person's profile picture
router.get('/getProfileImage',
  passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    let imageName = req.user.deliveryPersonImage;
    res.sendFile(path.join(__dirname + '/../' + 'uploads/' + 'images/' + 'delivery-person/' + imageName))
  })

// to get all orders placed
router.get('/getAllOrders',
  passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    finalData = {}
    resData = []
    deliveryPersonService.getAllOrders().then((data) => {
      // console.log(data)
      fIds = []
      for (let ord of data) {
        for (let id of ord.food) {
          fIds.push(id)
        }
      }
      console.log(fIds)
      deliveryPersonModel.getFoodDetails(fIds).then(foodData => {
        cIds = []
        for (let ord of data) {
          cIds.push(ord.customer)
        }
        deliveryPersonModel.getCustDetails(cIds).then(custData => {
          rIds = [];
          for (let ord of data) {
            rIds.push(ord.restaurant)
          }
          deliveryPersonModel.getRestDetails(rIds).then(restData => {
            if (data) {
              console.log(data)
              finalData.orders = data;
              finalData.foodData = foodData;
              finalData.custData = custData;
              finalData.restData = restData;
              // console.log(finalData)
              res.json(finalData);
            }
            else {
              let err = new Error('Unable to fetch orders');
              err.status = 500;
              throw err;
            }
          })

        })
      })
    }).catch(err => next(err))
  })

// route to pick an order for a delivery person
router.put('/pickOrder/',passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    let oId = req.body.orderId
    deliveryPersonService.pickOrder(req.user.deliveryPersonId, oId).then(data => {
      if (data) res.json({
        'message': data
      })
      else {
        let err = new Error('Unable to pick this order at this moment')
        err.status = 500;
        throw err;
      }
    }).catch(err => next(err))
  })

// route to deliver an order for a delivery person
router.put('/deliverOrder/',
  passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    let oId = req.body.orderId
    deliveryPersonService.deliverOrder(req.user.deliveryPersonId, oId).then(data => {
      if (data) res.json({
        'message': data
      })
      else {
        let err = new Error('Unable to pick this order at this moment')
        err.status = 500;
        throw err;
      }
    }).catch(err => next(err))
  })

// route to get all penalties
router.get('/getAllPenalties',
  passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    deliveryPersonService.getAllPenalties(req.user.deliveryPersonId).then(data => {
      if (data) res.json(data)
      else {
        let err = new Error('Could not fetch penalities.');
        err.status = 500;
        throw err
      }
    }).catch(err => next(err))
  })

// to pay a penalty
router.put('/payPenalty',
  passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    console.log(req.body.pId);
    let penaltyId = req.body.pId
    deliveryPersonService.payPenalty(req.user.deliveryPersonId, penaltyId).then(data => {
      if (data) {
        res.json({
          'message': data
        })
      } else {
        let err = new Error('Could not fetch penalities.');
        err.status = 500;
        throw err
      }
    }).catch(err => next(err))
  })

router.put('/updateDetails',
  passport.authenticate('delivery-person', { session: false }),
  upload.single('deliveryPersonImage'), async (req, res, next) => {
    let newDetails = req.body
    if (req.file) {
      let filename = new Date().toDateString() + '-' + req.file.originalname;
      filename = filename.split(' ').join('-');
      newDetails.deliveryPersonImage = filename;
      await imageHandler(req, 'delivery-person/').catch((err) => next(err))
    }
    deliveryPersonService.updateDetails(req.user.deliveryPersonId, newDetails).then(data => {
      if (data) {
        res.json(req.user)
      } else {
        let err = new Error('Failed to update details');
        err.status = 500;
        throw err;
      }
    }).catch(err => next(err))
  })

router.put('/cancelOrderPickup/',
  passport.authenticate('delivery-person', { session: false }),
  (req, res, next) => {
    let oId = req.body.orderId;
    deliveryPersonService.cancelOrder(oId, req.user.deliveryPersonId).then(data => {
      if (data) {
        res.json({
          'message': data
        })
      } else {
        let err = new Error('Order can not be cancelled at the moment!');
        err.status = 500;
        throw err;
      }
    }).catch(err => next(err))
  })
module.exports = router;