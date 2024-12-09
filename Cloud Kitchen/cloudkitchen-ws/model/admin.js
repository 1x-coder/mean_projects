var connection = require('../utilities/connection');



const adminModel = {}


adminModel.setupAdmin = (pass) => {
return connection.getAdminCollection().then((user) => {
    return user.deleteMany().then(() => {        
        return user.insertMany( adminData = [
            {
                "mobileNum":"9599790218",
                "password":pass
            }
        ]).then((result) => {
            if ( result ){
                return true
            }
                else return false 
        })
    })
})
}
adminModel.login_admin = (contact) => {
    return connection.getAdminCollection().then(admins=>{
        return admins.findOne({'mobileNum': contact}).then((admin)=>{
            if(admin){
                return admin
            }else{
                return null
            }
        })
    })
}

adminModel.getOrders=()=>{
    return connection.getOrdersCollection().then((data)=>{
        return data.find().then((order)=>{
            if(order.length!=0){
                return order
            }else{
                return null
            }
        })
    })
}

adminModel.getRest=()=>{
    return connection.getRestaurantCollection().then((data)=>{
        return data.find().then((rest)=>{
            if(rest.length!=0){
                return rest
            }else{
                return null
            }
        })
    })
}

adminModel.getCust=()=>{
    return connection.getCustomerCollection().then((data)=>{
        return data.find().then((cust)=>{
            if(cust.length!=0){
                return cust
            }else{
                return null
            }
        })
    })
}

adminModel.getDelPer=()=>{
    return connection.getDeliveryPersonCollection().then((data)=>{
        return data.find().then((delPers)=>{
            if(delPers.length!=0){
                return delPers
            }else{
                return null
            }
        })
    })
}

adminModel.delRestaurant=(del)=>{
    return connection.getRestaurantCollection().then((data)=>{
        return data.remove({restaurantId:del}).then((deli)=>{
            if(deli){
                return true
            }else{
                return null
            }
        })
    })
}

adminModel.delCustomer=(del)=>{
    return connection.getCustomerCollection().then((data)=>{
        return data.remove({customerId:del}).then((deli)=>{
            if(deli){
                return true
            }else{
                return null
            }
        })
    })
}

adminModel.delDelPer=(del)=>{
    return connection.getDeliveryPersonCollection().then((data)=>{
        return data.remove({deliveryPersonId:del}).then((deli)=>{
            if(deli){
                return true
            }else{
                return null
            }
        })
    })
}


module.exports = adminModel;