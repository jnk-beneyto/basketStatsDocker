const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a Schema
const resultado = new Schema({
    local: String,
    resLocal: Number,
    vis: String,
    resVis :Number,
})

module.exports = mongoose.model('resultado',resultado);