const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = Schema({
    idAsana: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Asana'
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Like', LikeSchema);