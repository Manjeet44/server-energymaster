const mongoose = require('mongoose');

const AsanaSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    beneficios: {
        type: String,
        required: true,
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