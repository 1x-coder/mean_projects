const users = require('../model/user_test')
const passwordUtils = require('../utilities/passwordUtils')

const Users ={}

Users.register_user = (cust) => { 

    return passwordUtils.genPassword(cust.password).then((hashed_pass)=>{
        cust.password = hashed_pass
        return users.register_user(cust).then((user)=>{
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


Users.login_user = (contact,pass) =>{
    return users.login_user(contact).then((cust)=>{
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

module.exports = Users