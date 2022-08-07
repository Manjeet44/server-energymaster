const {userRegister, getUser, loginUser, updateUser} = require('../controllers/userController');
const {newAsana, getAsanas, uploadImage} = require('../controllers/asanaController');
const {followUser, unFollow, isFollow, getUserFollowers, getUserFolloweds} = require('../controllers/followController');
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //User
        getUser: (_,{id, username}) => getUser(id, username),

        //Asana
        getAsanas: (_, {username}, ctx) => getAsanas(username, ctx),

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
        
    }
}
module.exports = resolvers;