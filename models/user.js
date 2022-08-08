const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
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
    siteWeb: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('User', UsuarioSchema);