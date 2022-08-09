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

module.exports = {
    addLike,
    deleteLike
}