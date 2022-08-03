const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    tokenId: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Users', UsuarioSchema);