const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log(token)
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized user'
        });
    }
};
