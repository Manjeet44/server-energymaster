const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    idAsana: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Asana'
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    comment: {
        type: String,
        trim: true,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);