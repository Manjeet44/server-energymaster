const {userRegister, getUser, loginUser, updateUser} = require('../controllers/userController');
const {newAsana, getAsanas, uploadImage, getAsana} = require('../controllers/asanaController');
const {followUser, unFollow, isFollow, getUserFollowers, getUserFolloweds} = require('../controllers/followController');
const {addLike, deleteLike} = require('../controllers/likesController');
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //User
        getUser: (_,{id, username}) => getUser(id, username),

        //Asana
        getAsanas: (_, {username}, ctx) => getAsanas(username, ctx),
        getAsana: (_, {id}, ctx) => getAsana(id, ctx),

        //Follow
        isFollow: (_, {username}, ctx) => isFollow(username, ctx),
        getFollowers: (_, {username}) => getUserFollowers(username),
        getFolloweds: (_, {username}) => getUserFolloweds(username),
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
        deleteLike: (_, {idAsana}, ctx) => deleteLike(idAsana, ctx)
    }
}
module.exports = resolvers;