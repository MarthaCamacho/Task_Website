const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI //Creación DB mern-task
? process.env.MONGODB_URI
:'mongodb://localhost/databasetest'; 

mongoose.connect(URI)
    .then(db => console.log("DB IS CONNECTED"))
    .catch(err => console.error(err));

module.exports = mongoose;