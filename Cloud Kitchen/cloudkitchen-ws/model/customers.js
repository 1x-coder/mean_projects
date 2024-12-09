var connection = require('../utilities/connection');

const customerModel = {}

customerModel.genCId = () => {
    let prev 
    return connection.getCustomerCollection().then((data)=>{
        return data.distinct("customerId").then((cId)=>{
            if(cId.length==0){
                return "C1001"
            }
            else{
                prev=cId.pop();
                prev=prev.substr(1);
                prev=Number(prev)
                prev=prev+1
                return "C" + String(prev)
            }
        })
    })
}

customerModel.genOId = () => {
    let prev 
    return connection.getOrdersCollection().then((data)=>{
        return data.distinct("orderId").then((oId)=>{
            if(oId.length==0){
                return "O1001"
            }
            else{
                prev=oId.pop();
                prev=prev.substr(1);
                prev=Number(prev)
                prev=prev+1
                return "O" + String(prev)
            }
        })
    })
}

// checks if any data for customer is available in db 
customerModel.testFunction = () => {
    return connection.getCustomerCollection().then((data) => {
        return data.find().then(customers => {
            if (customers.length > 0) {
                return customers
            }
            else return false
        })
    })
}

customerModel.register_user = (new_cust) =>{
    return connection.getCustomerCollection().then((customers)=>{
        return customerModel.genCId().then((cId)=>{
            new_cust.customerId=cId;
            return customers.insertMany([new_cust,]).then((cust)=>{
                if(cust){
                    return cust
                }else{
                    return null
                }
            })
        })
    })
}

customerModel.login_user = (contact) => {
    return connection.getCustomerCollection().then(customers=>{
        return customers.findOne({'mobileNum': contact}).then((cust)=>{
            if(cust){
                return cust
            }else{
                return null
            }
        })
    })
}

customerModel.get_all_restuarants = () => {
    return connection.getRestaurantCollection().then((rests)=> {
        return rests.find().then((restaurants)=>{
            if(restaurants.length > 0){
                return restaurants
            }else{
                return null
            }
        })
    })
}


customerModel.filter_restuarants = (keyword) => {
    return connection.getRestaurantCollection().then((rests)=> {
        return rests.find({ "restaurantName": { $regex: "("+keyword+")", $options: 'i' } }).then((restaurants)=>{
            if(restaurants.length > 0){
                return restaurants
            }else{
                return null
            }
        })
    })
    
}

customerModel.filter_food = (keyword) =>{
    return connection.getFoodCollection().then((food)=>{
        return food.find({ "name": { $regex: "("+keyword+")" } }).then((food)=>{
            if(food.length>0){
                return food
            }else{
                return null
            }
        })
    })
}


customerModel.get_restuarant_detail = (id) =>{
    return connection.getRestaurantCollection().then((rests)=>{
        return rests.findOne({ "_id": id }).then((rest)=>{
            if(rest){
                return rest
            }else{
                return null
            }
        })
    })
}

customerModel.get_food_detail = (id) =>{
    return connection.getFoodCollection().then((food)=>{
        return food.findOne({ "foodId": id }).then((food)=>{
            if(food){
                return food
            }else{
                return null
            }
        })
    })
}

customerModel.view_orders = (cust_id) => {
    return connection.getOrdersCollection().then((orders)=> {
        return orders.find({"customer": cust_id}).then((orders_list) => {
            if (orders_list){
                return orders_list
            }else{
                return null
            }
        })
    })
}


customerModel.cancel_orders = (order_id) => {
    return connection.getOrdersCollection().then((orders)=>{
        return orders.updateOne({"_id": order_id}, {"state": "cancelled"}).then((updateRes)=>{
            if(updateRes.nModified > 0){
                return updateRes
            }else{
                return null
            }
        })
    })
}

customerModel.update_address = (custId, new_address) => {
    return connection.getCustomerCollection().then((customers)=>{
        return customers.updateOne({"_id": custId},{"address": new_address}).then((updateRes)=>{
            if(updateRes.nModified > 0){
                return updateRes
            }else{
                return null
            }
        })
    })
}

customerModel.update_profile = (custId, new_details) => {
    return connection.getCustomerCollection().then((customers)=>{
        return customers.updateOne({"_id":custId}, new_details).then((updateRes)=>{
            if(updateRes.nModified > 0){
                return updateRes
            }else{
                return null
            }
        })
    })
}


customerModel.place_order = (order_details) => {
    return customerModel.genOId().then((orderId) => {
        order_details.orderId = orderId;
        return connection.getOrdersCollection().then((orders)=>{
            return orders.insertMany([order_details,]).then((added_order)=>{
                if(added_order){
                    return added_order
                }else{
                    return null
                }
            })
        })
    })
}

customerModel.get_food = (food_id) => {
    return connection.getFoodCollection().then((foods)=>{
        return foods.findOne({'foodId': food_id}, {'name': 1}).then((food)=>{
            if(food){
                return food
            }else{
                return null
            }
        })
    })
}

customerModel.get_restaurant_name = (rest_id) => {
    return connection.getRestaurantCollection().then((rest)=>{
        return rest.findOne({'restaurantId': rest_id}, { '_id':0 ,'restaurantName': 1}).then((rest)=>{
            if(rest){
                return rest
            }else{
                return null
            }
        })
    })
}

customerModel.get_restuarant = (id) =>{
    return connection.getRestaurantCollection().then((rests)=>{
        return rests.findOne({ "restaurantId": id }).then((rest)=>{
            if(rest){
                return rest
            }else{
                return null
            }
        })
    })
}
customerModel.cancle=(del)=>{
    return connection.getOrdersCollection().then((data)=>{
        return data.deleteMany({"orderId":del}).then((deli)=>{
            if(deli){
                return true
            }else{
                return null
            }
        })
    })
}

module.exports = customerModel;