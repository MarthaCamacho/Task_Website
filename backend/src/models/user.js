const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserShema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required:true},
    password: { type: String, required:true},
});

//Modelo de datos - reutilizacion
module.exports = mongoose.model('User', UserShema);