const {userRegister, getUser, loginUser} = require('../controllers/userController');
const {newAsana, getAsanas, uploadImage} = require('../controllers/asanaController');
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //User
        getUser: (_,{id, username}) => getUser(id, username),

        //Asana
        getAsanas: (_, {username}, ctx) => getAsanas(username, ctx)
    },
    Mutation: {
        //User
        register: (_, {input}) => userRegister(input),
        login: (_, {input}) => loginUser(input),

        //Asana
        newAsana: (_, {input, file}, ctx) => newAsana(input, file, ctx),
        uploadImage: (_, {file}, ctx) => uploadImage(file, ctx)
        
    }
}
module.exports = resolvers;