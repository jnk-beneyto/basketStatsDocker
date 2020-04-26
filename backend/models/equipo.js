const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a Schema
const equipo = new Schema({
    nombre: String
})

module.exports = mongoose.model('equipo',equipo);