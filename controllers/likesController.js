const Like = require('../models/likes');

async function deleteLike(idAsana, ctx) {
    try {
        await Like.findOneAndDelete({idAsana}).where({idUser: ctx.user.id});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function addLike(idAsana, ctx) {
    try {
        const like = new Like({
            idAsana,
            idUser: ctx.user.id
        });
        like.save();
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

async function isLike(idAsana, ctx) {
    try {
        const result = await Like.findOne({idAsana}).where({idUser: ctx.user.id});
        if(!result) throw new Error('No le ha dado a like');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function countLikes(idAsana) {
    try {
        const result = await Like.countDocuments({idAsana});
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addLike,
    deleteLike,
    isLike, 
    countLikes
}