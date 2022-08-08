const mongoose = require('mongoose');

const AsanaSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    beneficios: {
        type: String,
        require: true,
        trim: true
    },
    file: {
        type: String,
        trim: true,
    },
    typeFile: {
        type: String,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Asana', AsanaSchema);