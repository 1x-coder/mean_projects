const passwordUtils = require('../utilities/passwordUtils');
const model=require('../model/admin')


const adminService = {};

adminService.setupAdmin= (pass) => { 

    return passwordUtils.genPassword(pass).then((hashed_pass)=>{
         pass= hashed_pass
        return model.setupAdmin(pass).then((user)=>{
            if(user){
                return "Password set"
            }else{
                let err = new Error('Unable to  setup user.')
                err.status = 500
                throw err
            }
        })
    })

}

adminService.login_admin = (contact,pass) =>{
    return model.login_admin(contact).then((ad)=>{
        if(ad){
            return passwordUtils.validPassword(pass, ad.password).then((same)=>{
                if (same){
                    const tokenObj = passwordUtils.issueJWT(ad)
                    return {success: true, user: ad, token: tokenObj.token, expiresIn: tokenObj.expires}
                }else{
                    err = new Error('Password Mismatched')
                    err.status = 404
                    throw err
                }
            })

        }else{
            err = new Error('Admin not found')
            err.status = 404
            throw err
        }
    })
}

adminService.getOrders=()=>{
    return model.getOrders().then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to  get orders')
            err.status = 500
            throw err
        }
    })
}

adminService.getRest=()=>{
    return model.getRest().then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to  get restaurants')
            err.status = 500
            throw err
        }
    })
}

adminService.getCust=()=>{
    return model.getCust().then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to  get customers')
            err.status = 500
            throw err
        }
    })
}

adminService.getDelPers=()=>{
    return model.getDelPer().then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to  get delivery persons')
            err.status = 500
            throw err
        }
    })
}

adminService.delRestaurant=(del)=>{
    return model.delRestaurant(del).then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to  delete retaurant')
            err.status = 500
            throw err
        }
    })
}

adminService.delCustomer=(del)=>{
    return model.delCustomer(del).then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to delete customer')
            err.status = 500
            throw err
        }
    })
}

adminService.delDelPer=(del)=>{
    return model.delDelPer(del).then((data)=>{
        if(data){
            return data
        }else{
            let err = new Error('Unable to  delete delivery persons')
            err.status = 500
            throw err
        }
    })
}



module.exports = adminService;