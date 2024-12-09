const crypto = require('crypto') // import crypto module to generate private and public rsa keys for jwt token generation
const fs= require('fs')

genKeyPair = () =>{
    const keyPair = crypto.generateKeyPairSync('rsa', { // rsa is one of the defaul algos to generate keys
        modulusLength: 4096, // 4096 is default rsa length
        publicKeyEncoding: {  // specs for public key
            type: 'pkcs1',
            format:'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format:'pem'
        }
    })
    fs.writeFileSync(__dirname+'/rsa_pub_key.pem', keyPair.publicKey) // key will be stored in .pem file
    fs.writeFileSync(__dirname+'/rsa_priv_key.pem', keyPair.privateKey) // key will be stored in .pem file
} 

genKeyPair()

// IN ORDER TO GENERATE KEYS RUN THIS FILE: node generateKeys.js