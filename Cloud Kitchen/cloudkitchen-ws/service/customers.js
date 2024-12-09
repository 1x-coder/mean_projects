var customerModel = require('../model/customers');
const passwordUtils = require('../utilities/passwordUtils');

const customerService = {};

// service to connect to customer db model
customerService.testFunction = () => {
    return customerModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}


customerService.register_user = (cust) => { 

    return passwordUtils.genPassword(cust.password).then((hashed_pass)=>{
        cust.password = hashed_pass
        return customerModel.register_user(cust).then((user)=>{
            if(user){
                return user
            }else{
                let err = new Error('Unable to register user.')
                err.status = 500
                throw err
            }
        })
    })

}


customerService.login_user = (contact,pass) =>{
    return customerModel.login_user(contact).then((cust)=>{
        if(cust){
            // matching password refer passwordUtils.js
            return passwordUtils.validPassword(pass, cust.password).then((matched)=>{
                if (matched){
                    // issuing token after successful login :: refer passwordUtils.js
                    const tokenObj = passwordUtils.issueJWT(cust)
                    return {success: true, user: cust, token: tokenObj.token, expiresIn: tokenObj.expires}
                }else{
                    err = new Error('Password Mismatched')
                    err.status = 404
                    throw err
                }
            })

        }else{
            err = new Error('Customer not found')
            err.status = 404
            throw err
        }
    })
}


customerService.get_all_restuarants = () =>{
    return customerModel.get_all_restuarants().then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('No restaurants found.')
            err.status = 404
            throw err
        }
    })
}

customerService.filter_restuarants = (keyword) => {
    return customerModel.filter_restuarants(keyword).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('No restaurants found.')
            err.status = 404
            throw err
        }
    })
}

customerService.filter_food = (keyword) => {
    return customerModel.filter_food(keyword).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('No food found.')
            err.status = 404
            throw err
        }
    })
}

customerService.get_restuarant_detail = (id) => {
    return customerModel.get_restuarant_detail(id).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('Restaurant Unavailable')
            err.status = 404
            throw err
        }
    })
}

customerService.get_food_detail = (id) => {
    return customerModel.get_food_detail(id).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('Restaurant Unavailable')
            err.status = 404
            throw err
        }
    })
}

customerService.view_orders = (custId) => {
    return customerModel.view_orders(custId).then((data)=> {
        if(data){
            return data
        }else{
            err = new Error('No orders yet.')
            err.status = 404
            throw err
        }
    })
}

customerService.update_address = (custId, new_address) => {
    return customerModel.update_address(custId, new_address).then((data)=>{
        if(data){
            return "Address updated successfully."
        }else{
            err = new Error('Unable to update address of customer with ID:'+ custId +'.')
            err.status = 500
            throw err
        }
    })
}

customerService.cancel_orders = (order_id) => {
    return customerModel.cancel_orders(order_id).then((data)=>{
        if(data){
            return "Order cancelled successfully."
        }else{
            err = new Error('Unable to cancel order with ID:'+ order_id +'.')
            err.status = 500
            throw err
        }
    })
}

customerService.update_profile = (custId, new_details) => {
    return customerModel.update_profile(custId, new_details).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('Unable to update profile of customer with ID:'+ custId +'.')
            err.status = 500
            throw err
        }
    })
}


customerService.place_order = (orders) =>{
    return customerModel.place_order(orders).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('Unable place order.')
            err.status = 500
            throw err
        }
    })
}

customerService.get_food= (food_id) =>{
    return customerModel.get_food(food_id).then((food)=>{
        if(food){
            return food
        }else{
            err = new Error('Food Item not found.')
            err.status = 404
            throw err
        }
    })
}

customerService.get_restaurant_name= (rest_id) =>{
    return customerModel.get_restaurant_name(rest_id).then((rest)=>{
        if(rest){
            return rest
        }else{
            err = new Error('Restaurant not found.')
            err.status = 404
            throw err
        }
    })
}

customerService.get_restuarant = (id) => {
    return customerModel.get_restuarant(id).then((data)=>{
        if(data){
            return data
        }else{
            err = new Error('Restaurant Unavailable')
            err.status = 404
            throw err
        }
    })
}

customerService.cancel=(del)=>{
    return customerModel.cancle(del).then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to delete order')
            err.status = 404
            throw err
        }
    })
}

module.exports = customerService;