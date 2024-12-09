var deliveryPersonModel = require('../model/delivery-persons');
var passwordUtils = require('../utilities/passwordUtils');
const deliveryPersonService = {};

// service to connect to delivery-person db model
deliveryPersonService.testFunction = () => {
    return deliveryPersonModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}

// service for delivery persons registration
deliveryPersonService.register = (deliveryPersonObj) => {
    return passwordUtils.genPassword(deliveryPersonObj.password).then(hashPassowrd => {
        deliveryPersonObj.password = hashPassowrd;
        return deliveryPersonModel.register(deliveryPersonObj).then(data => {
            if (data) return true;
            else return false;
        })
    })

}

// service for delivery persons login
deliveryPersonService.login = (credentials) => {
    return deliveryPersonModel.login(credentials).then(data => {
        delete data.password
        if (data) {
            let tokenObj = passwordUtils.issueJWT(data);
            return {
                success: true,
                message: `Welcome, ${data.name}!`,
                user: data,
                token: tokenObj.token,
                expiresIn: tokenObj.expires
            }
        }
        else return false;
    })
}

// service to fetch all orders for dp
deliveryPersonService.getAllOrders = () => {
    return deliveryPersonModel.getAllOrders().then(data => {
        if (data) return data
        else return false
    })
}

// service to pick an order for dp
deliveryPersonService.pickOrder = (deliveryPersonId, orderId) => {
    return deliveryPersonModel.pickOrder(deliveryPersonId, orderId).then(data => {
        if (data) return data
        else return false
    })
}

// service to deliver an order for dp
deliveryPersonService.deliverOrder = (deliveryPersonId, orderId) => {
    return deliveryPersonModel.deliverOrder(deliveryPersonId, orderId).then(data => {
        if (data) return data
        else return false
    })
}

// service to fetch all penalties
deliveryPersonService.getAllPenalties = (deliveryPersonId) => {
    return deliveryPersonModel.getAllPenalties(deliveryPersonId).then(data => {
        if (data) return data
        else return false
    })
}

deliveryPersonService.payPenalty = (deliveryPersonId, penaltyId) => {
    return deliveryPersonModel.payPenalty(deliveryPersonId, penaltyId).then((data) => {
        if (data) return data
        else return false
    })
}

deliveryPersonService.updateDetails = (deliveryPersonId, newDetails) => {
    return deliveryPersonModel.updateProfile(deliveryPersonId, newDetails).then(data => {
        if (data) {
            return "updated successfully!"
        }
        else return false
    })
}

deliveryPersonService.cancelOrder = (oId, deliveryPersonId) => {
    return deliveryPersonModel.cancelOrder(oId, deliveryPersonId).then(data => {
        if (data) return data;
        else return false
    })
}


module.exports = deliveryPersonService;