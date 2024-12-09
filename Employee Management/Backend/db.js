const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/starkindustry');

mongoose.connection.on('connected',() =>{
    console.log('MongoDB Connected Successfully');
});

mongoose.connection.on('error',(err) =>{
    console.log(err);
});

module.exports = mongoose;