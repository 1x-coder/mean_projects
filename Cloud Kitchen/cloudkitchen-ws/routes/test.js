const express = require('express')
const router = express.Router()
const create = require('../model/setupDb');
const multer = require('multer') // used to handle images
const imageHandler = require('../utilities/ImageHandler');
const jwt = require('jsonwebtoken')
const argon2 = require('argon2');

// multer image storage setup
let storage = multer.memoryStorage();
let upload = multer({ storage })

router.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data);
    }).catch(err => {
        next(err);
    })
})

router.post('/imageUpload', upload.single('image'), async (req, res, next) => {
    await imageHandler(req); // sends the request to image handler in utilities
    res.send('upload successful');
})

// header => Authorization: Bearer <token>
router.post('/post', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created',
                authData
            })
        }
    })

})

router.post('/register', async (req, res, next) => {
    let obj = req.body;
    hashPassword = await argon2.hash(obj.password, { type: argon2.argon2id })
    console.log(`Hash: ${hashPassword}`);
    res.send("hashed")

})

router.post('/post/login', async (req, res, next) => {
    // mock user
    let user = req.body;
    jwt.sign({ user }, 'secretkey', (err, token) => {
        if (err) throw err;
        else {
            res.json({
                token
            })
        }

    })
})

// format of token
// authorization: bearder <access_token>

function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearder is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at space
        const bearer = bearerHeader.split(' ')
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken
        // next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403)
    }

}

module.exports = router