const connection = require('../utilities/connection')

const Users = {}

Users.register_user = (new_cust) =>{
    return connection.getCustomerCollection().then((customers)=>{
        return customers.insertMany([new_cust,]).then((cust)=>{
            if(cust){
                return cust
            }else{
                return null
            }
        })
    })
}

Users.login_user = (contact) => {
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

module.exports = Users