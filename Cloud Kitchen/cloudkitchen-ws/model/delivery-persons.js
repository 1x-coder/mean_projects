var connection = require('../utilities/connection');
const argon2 = require('argon2'); // for password decryption
const { connect } = require('mongoose');
const passwordUtils = require('../utilities/passwordUtils');

const deliveryPersonModel = {}

// to generate Id for delivery person
deliveryPersonModel.generateId = () => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return collection.distinct('deliveryPersonId').then((ids) => {
            let dpIds = []
            for (let id of ids) {
                dpIds.push(Number(id.slice(1,)))
            }
            let dpId = Math.max(...dpIds)
            return dpId + 1;
        })
    })
}

deliveryPersonModel.generatePenalitiesId = () => {
    return connection.getPenaltiesCollection().then((collection) => {
        return collection.distinct('penaltiesId').then((ids) => {
            let pIds = []
            for (let id of ids) {
                pIds.push(Number(id.slice(1,)))
            }
            let pId = Math.max(...pIds)
            return pId + 1;
        })
    })
}

// checks if any data for delivery-person is available in db
deliveryPersonModel.testFunction = () => {
    return connection.getDeliveryPersonCollection().then((data) => {
        return data.find().then(deliveryPersons => {
            if (deliveryPersons.length > 0) {
                return deliveryPersons
            }
            else return false
        })
    })
}

// to register delivery person and add to database
deliveryPersonModel.register = (deliveryPersonObj) => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return deliveryPersonModel.generateId().then((id) => {
            deliveryPersonObj.deliveryPersonId = 'D' + id;
            return collection.create(deliveryPersonObj).then((data) => {
                if (data) return true;
                else return false;
            })
        })
    })
}

// to check credentials for delivery person and authorize login
deliveryPersonModel.login = (credentials) => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return collection.findOne({ mobileNum: credentials.mobileNum }).then((data) => {
            // argon2 decryption to verify the password
            if (data) {
                return passwordUtils.validPassword(credentials.password, data.password).then((correct) => {
                    if (correct) {
                        let { password, ...y } = data;
                        return y._doc;
                    } else return false;
                })
            } else {
                let err = new Error('User not found!');
                err.status = 404;
                throw err;
            }

        })
    })
}

// to fetch all orders for a delivery person
deliveryPersonModel.getAllOrders = () => {
    return connection.getOrdersCollection().then((collection) => {
        return collection.find({},{ _id: 0 }).then((data) => {
            if (data) return data
            else {
                let err = new Error('Unable to get orders')
                err.status = 500;
                throw err;
            }
        })
    })
}

deliveryPersonModel.getFoodDetails = (ids) => {
    console.log(ids)
    return connection.getFoodCollection().then(collection => {
        return collection.find({}, { _id: 0, name: 1, foodId: 1 }).then(data => {
            console.log(data)
            if (data) return data;
        })
    })
}

deliveryPersonModel.getCustDetails = (ids) => {
    return connection.getCustomerCollection().then(collection => {
        return collection.find({ customerId: { $in: ids } },
            { _id: 0, customerId: 1, name: 1, address: 1 }).then(data => {
                if (data) return data;
            })
    })
}

deliveryPersonModel.getRestDetails = (ids) => {
    return connection.getRestaurantCollection().then(collection => {
        return collection.find({ restaurantId: { $in: ids } },
            { _id: 0, restaurantId: 1, restaurantName: 1, restaurantAddress: 1 }).then(data => {
                if (data) return data;
            })
    })
}

// to pick an order for a delivery person
deliveryPersonModel.pickOrder = (deliveryPersonId, orderId) => {
    return connection.getOrdersCollection().then((collection) => {
        return collection.updateOne({ orderId: orderId },
            { $set: { deliveryPerson: deliveryPersonId, state: 'alloted-delivery' } }).then(data => {
                if (data) return `Order with orderID ${orderId} alloted for ${deliveryPersonId}`;
                else return false
            })
    })

}

// to deliver an order for a delivery person
deliveryPersonModel.deliverOrder = (deliveryPersonId, orderId) => {
    return connection.getOrdersCollection().then((collection) => {
        return collection.updateOne({ orderId: orderId },
            { $set: { deliveryPerson: deliveryPersonId, state: 'completed' } }).then(data => {
                if (data) return `Order with orderID ${orderId} is completed.`;
                else return false
            })
    })

}

// to fetch all penalties
deliveryPersonModel.getAllPenalties = (deliveryPersonId) => {
    return connection.getPenaltiesCollection().then((collection) => {
        return collection.find({ deliveryPerson: deliveryPersonId }).then((data) => {
            if (data.length > 0) return data
            else {
                let err = new Error('No penalities found');
                err.status = 404;
                throw err;
            }
        })
    })
}

// to pay penalty
deliveryPersonModel.payPenalty = (deliveryPersonId, penaltyId) => {
    return connection.getPenaltiesCollection().then((collection) => {
        return collection.updateOne({
            $and: [{ deliveryPerson: deliveryPersonId }, { penaltiesId: penaltyId }]
        }, { $set: { paid: true } }).then((data) => {
            if (data.nModified !== 0) return `Penality for ${deliveryPersonId} is paid successfully!`
            else {
                let err = new Error("Failed to update payment");
                err.status = 500;
                throw err;
            }
        })
    })
}

// to update profile
deliveryPersonModel.updateProfile = (deliveryPersonId, newDetails) => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return collection.updateOne({ deliveryPersonId: deliveryPersonId }, newDetails).then(data => {
            if (data) {
                return collection.findOne({ deliveryPersonId: deliveryPersonId }).then((data) => {
                    if (data) return data;
                    else {
                        let err = new Error('Failed to get updated detail');
                        err.status = 500;
                        throw err;
                    }
                })
            }
            else {
                let err = new Error('Failed to update details');
                err.status = 500;
                throw err;
            }
        })
    })
}

// to cancel a pick up
deliveryPersonModel.cancelOrder = (oId, deliveryPersonId) => {
    return connection.getOrdersCollection().then(ordersCollection => {
        return ordersCollection.findOne({ $and: [{ orderId: oId }, { deliveryPerson: deliveryPersonId }] }).then(order => {
            if (order.state === 'alloted-delivery' || order.state === 'cooked' || order.state === 'picked') {
                return ordersCollection.updateOne({ orderId: oId },
                    { $set: { state: 'pending', deliveryPerson: '' } }).then(data => {
                        if (data) {
                            return connection.getPenaltiesCollection().then(penaltiesCollection => {
                                return deliveryPersonModel.generatePenalitiesId().then(pId => {
                                    let penaltyObj = {}
                                    penaltyObj.penaltiesId = "P" + pId;
                                    penaltyObj.order = oId;
                                    penaltyObj.deliveryPerson = deliveryPersonId;
                                    order.state === 'alloted-delivery' ?
                                        penaltyObj.penalityCost = order.totalCost * 0.05 :
                                        penaltyObj.penalityCost = order.totalCost + order.totalCost * 0.05;
                                    penaltyObj.paid = false;
                                    return penaltiesCollection.create(penaltyObj).then(created => {
                                        if (created) {
                                            return `Order with orderId: ${oId} is cancelled. Please pay the penalty amount of Rs.${created.penalityCost}.`
                                        } else {
                                            let err = new Error('Order can not be cancelled at the moment. Try again later!');
                                            err.status = 500;
                                            throw err;
                                        }
                                    })
                                })
                            })
                        }
                    })
            } else {
                let err = new Error('Can not cancel order at this stage.');
                err.status = 403;
                throw err;
            }
        })
    })
}

module.exports = deliveryPersonModel;