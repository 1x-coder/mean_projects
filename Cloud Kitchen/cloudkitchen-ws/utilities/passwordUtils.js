const argon2 = require('argon2') // for hashing
const jsonwebtoken = require('jsonwebtoken') // generation of jwt token
const fs = require('fs')
const path = require('path')

const PRIV_KEY_PATH = path.join(__dirname, 'rsa_priv_key.pem') // private key path
const PRIV_KEY = fs.readFileSync(PRIV_KEY_PATH, 'utf-8') // private key content

const validation = {}

// used to verify whether hashed value in db is same as hash value of entered password
validation.validPassword = (password, hash) => {  
    var hashVerify = argon2.verify(hash, password)
    return hashVerify
}

// used to generate hash value of password while registering
validation.genPassword = (password) => {
    return argon2.hash(password).then((hash)=>{
        return hash
    })
}

// used to issue a jwt token using private key while first login.
validation.issueJWT = (user) =>{

    const _id = user._id // will be used to look up user

    const expiresIn = '15d' // validation of token : 15d : 15 days

    const payload = { // content of jwt token which will be used in passport strategy
        sub: _id,
        iat: Date.now()
    }
    // the token is signed using jsonwebtoken package using private key and algo RS256 which will be later used to verify
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'})

    return{
        token: "Bearer "+signedToken, // Bearer<space><token> is format because we will use fromAuthHeaderAsBearerToken() to extract token content
        expires: expiresIn
    }
}


module.exports = validation