const jwt = require('jsonwebtoken');
const {ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
//const {graphqlUploadExpress} = require('graphql-upload');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');
require('dotenv').config({path: '.env'});

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, _) => {
    if(err) {
        console.log('Error de conexion');
    } else {
        server();
    }
});


async function server() {
    const serverApollo = new ApolloServer({
        cors: {
            origin: '*',
            credentials: true
        },
        cache: "bounded",
        typeDefs,
        resolvers,
        context: ({req}) => {
            const token = req.headers.authorization;
            if(token) {
                try {
                    const user = jwt.verify(
                        token.replace("Bearer ", ""),
                        process.env.SECRET_KEY
                    );
                    return {
                        user,
                    };
                } catch (error) {
                    console.log('###ERROR###')
                    console.log(error);
                    throw new Error('Token invalido')
                }
            }
        }
    });
    await serverApollo.start();
    const app = express();
    app.use(graphqlUploadExpress());
    serverApollo.applyMiddleware({app, path: "/graphql"});
    await new Promise((r) => app.listen({port: process.env.PORT || 4000}, r));
    console.log('################');
    console.log(`Server Ready at http://localhost:${process.env.PORT}${serverApollo.graphqlPath}`);
    console.log('################');
}
