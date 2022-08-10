const Comment = require('../models/comment');

async function addNewComment(input, ctx) {
    try {
        const comment = new Comment({
            idAsana: input.idAsana,
            idUser: ctx.user.id,
            comment: input.comment
        });
        comment.save();
        return comment;
    } catch (error) {
        console.log(error)
    }
}

async function getPubliComments(idAsana) {
    const result = await Comment.find({idAsana}).populate('idUser');
    return result;
}

module.exports = {
    addNewComment,
    getPubliComments
}