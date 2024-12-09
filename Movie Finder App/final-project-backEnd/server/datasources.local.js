require('dotenv').config();

module.exports = {
    db: {
        name: "db",
        connector: "memory"
    },
    mongo: {
        url: process.env.DB_URL, 
        connector: 'mongodb',
        name: "mongo"
    }
}