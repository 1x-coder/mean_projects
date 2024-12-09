var express = require('express');
var router = express.Router();
var adminService = require('../service/admin');
const passport = require('passport');

router.get('/', (req, res, next)=>{
    return adminService.setupAdmin("Admin@123").then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
    })

router.post('/login', (req, res, next)=>{
    let contact = req.body.contact
    let password = req.body.pass
    return adminService.login_admin(contact, password).then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
    })


router.get('/order', passport.authenticate('admin', {session: false}), (req, res, next)=>{
    return adminService.getOrders().then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
})

router.get('/restaurant', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  return adminService.getRest().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/customer', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  return adminService.getCust().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/delper', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  return adminService.getDelPers().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})
    
router.delete('/restaurant/:restaurant', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  var del =req.params.restaurant
  return adminService.delRestaurant(del).then((data)=>{
    res.send("Restaurant with id"+del+"is deleted")
  }).catch(err=>next(err))
})

router.delete('/customer/:customer', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  var del =req.params.customer
  return adminService.delCustomer(del).then((data)=>{    
    res.send("Customer with id"+del+"is deleted")
  }).catch(err=>next(err))
})

router.delete('/delper/:delper', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  var del =req.params.delper
  return adminService.delDelPer(del).then((data)=>{
    res.send("Delivery Person with id"+del+"is deleted")
  }).catch(err=>next(err))
})



module.exports = router;