const {userRegister, getUser, loginUser, updateUser, busqueda} = require('../controllers/userController');
const {newAsana, getAsanas, uploadImage, getAsana, getAsanaFolloweds, getAsanaByLike} = require('../controllers/asanaController');
const {followUser, unFollow, isFollow, getUserFollowers, getUserFolloweds} = require('../controllers/followController');
const {addLike, deleteLike, isLike, countLikes} = require('../controllers/likesController');
const {addNewComment, getPubliComments} = require('../controllers/commentController');
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //User
        getUser: (_,{id, username}) => getUser(id, username),
        search: (_,{search}) => busqueda(search),

        //Asana
        getAsanas: (_, {username}, ctx) => getAsanas(username, ctx),
        getAsana: (_, {id}, ctx) => getAsana(id, ctx),
        getAsanaFolloweds: (_, {}, ctx) => getAsanaFolloweds(ctx),
        getAsanaByLike: (_, {}, ctx) => getAsanaByLike(ctx),

        //Follow
        isFollow: (_, {username}, ctx) => isFollow(username, ctx),
        getFollowers: (_, {username}) => getUserFollowers(username),
        getFolloweds: (_, {username}) => getUserFolloweds(username),

        // Like
        isLike: (_, {idAsana}, ctx) => isLike(idAsana, ctx),
        countLikes: (_, {idAsana}) => countLikes(idAsana),

        //Comment
        getComments: (_, {idAsana}) => getPubliComments(idAsana),
    },
    Mutation: {
        //User
        register: (_, {input}) => userRegister(input),
        login: (_, {input}) => loginUser(input),
        updateUser: (_, {input}, ctx) => updateUser(input, ctx),

        //Asana
        newAsana: (_, {input, file}, ctx) => newAsana(input, file, ctx),
        uploadImage: (_, {file}, ctx) => uploadImage(file, ctx),

        //Follow
        followUser: (_, {username}, ctx) => followUser(username, ctx),
        unFollow: (_, {username}, ctx) => unFollow(username, ctx),
        
        // Likes
        addLike: (_, {idAsana}, ctx) => addLike(idAsana, ctx),
        deleteLike: (_, {idAsana}, ctx) => deleteLike(idAsana, ctx),

        //Comment
        addComment: (_, {input}, ctx) => addNewComment(input, ctx),
    }
}
module.exports = resolvers;