const JWTStrategy = require('passport-jwt').Strategy // jwt strategy
const ExtractJWT = require('passport-jwt').ExtractJwt // needed to extract jwt token
const fs = require('fs')
const path = require('path')
const connection = require('./connection')

const PUB_KEY_PATH = path.join(__dirname, 'rsa_pub_key.pem') //retrieving public key
const PUB_KEY = fs.readFileSync(PUB_KEY_PATH, 'utf-8')

// set of options to use in jwt strategy
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // refer passwordUtils.js
    algorithms: ['RS256', ], // refer passwordUtils.js
    secretOrKey: PUB_KEY, // Public key to verify
}

// callback method to be used in jwt strategy
// if jwt token payload is decrypted using public key successfully, it returns user.
const verifyCallback = (payload, done) =>{
    return connection.getAdminCollection().then((admin)=>{ // get the admin collection
        return admin.findOne({'_id': payload.sub}).then((data)=>{ // match using id
            if(data){ // if any admin is returned
                done(null, data) // return no errors(null), user (data)
            }else{
                done(null, false) // return no error(null), no user(false)
            }
        }).catch(err=>done(err)) //return error (err)
    })
    

}

const strategy = new JWTStrategy(options, verifyCallback); // integrate strategy callback and option

module.exports = (passport)=>{
    passport.use('admin',strategy) // use in passport middleware
}