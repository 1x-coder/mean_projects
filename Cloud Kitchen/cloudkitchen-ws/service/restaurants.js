var restaurantModel = require('../model/restaurants');
const passwordUtils = require('../utilities/passwordUtils');

const restaurantService = {};

// service to connect to restaurant db model
restaurantService.testFunction = () => {
    return restaurantModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}


restaurantService.testFunctionFood=()=>{
    return restaurantModel.testFunctionFood().then((data)=>{
       if(data){
           return true;
       }else{
           return false;
       }
    })
}

// service for restaurant registration
restaurantService.register = (restaurantObj) => {
    
    return passwordUtils.genPassword(restaurantObj.restaurantPassword).then((hashed_pass)=>{
        restaurantObj.restaurantPassword = hashed_pass
        
    return restaurantModel.register(restaurantObj).then(data => {
       
        if (data) return data;
        else return false;
    })
})
}

restaurantService.login=(contact,password)=>{
    
    return restaurantModel.login(contact).then(data => {
        if(data){
        return passwordUtils.validPassword(password, data.restaurantPassword).then((matched)=>{
            if (matched){
                // issuing token after successful login :: refer passwordUtils.js
                const tokenObj = passwordUtils.issueJWT(data)
                return {success: true, user: data, token: tokenObj.token, expiresIn: tokenObj.expires}
            } 
        else return false;
    })
}else return false
})
}

restaurantService.viewRestaurantProfile = (restId) => {
    return restaurantModel.viewRestaurantProfile(restId).then((data)=> {
        if(data){
            return data
        }else{
            err = new Error('No orders yet.')
            err.status = 404
            throw err
        }
    })
}

restaurantService.updateRestaurantProfile=(restaurantId,restaurantObj)=>{
    
    return restaurantModel.updateRestaurantProfile(restaurantId,restaurantObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.addMenu=(foodObj)=>{
    
    return restaurantModel.addMenu(foodObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.viewMenu = (restId) => {
    return restaurantModel.viewMenu(restId).then((data)=> {
        if(data){
            return data
        }else{
            err = new Error('No orders yet.')
            err.status = 404
            throw err
        }
    })
}

restaurantService.foodD = (restId) => {
    return restaurantModel.foodD(restId).then((data)=> {
        if(data){
            return data
        }else{
            return false
        }
    })
}

restaurantService.updateMenu=(foodObj)=>{
   
    return restaurantModel.updateMenu(foodObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.deleteMenu=(restaurantId,foodId)=>{
   
    return restaurantModel.deleteMenu(restaurantId,foodId).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.addAmbience=(restaurantId,restaurantAmbience)=>{
    
    return restaurantModel.addAmbience(restaurantId,restaurantAmbience).then(data => {
        if (data) return data;
        else return false;
    })
}


restaurantService.deleteAmbience=(restaurantId,restaurantAmbience)=>{
    
    return restaurantModel.deleteAmbience(restaurantId,restaurantAmbience).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.getOrders=(restaurantId)=>{

    return restaurantModel.getOrders(restaurantId).then(data=>{
        if (data) return data;
        else return false; 
    })

}

restaurantService.changeOrderState=(orderId,status)=>{

    return restaurantModel.changeOrderState(orderId,status).then(data=>{
    if (data) return data;
    else return false; 
})
}
module.exports = restaurantService;