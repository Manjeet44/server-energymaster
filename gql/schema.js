const {gql} = require('apollo-server-express');

const typeDefs = gql`
    scalar Upload

    type User {
        id: ID
        nombre: String
        apellido: String
        username: String
        email: String
        password: String
        avatar: String
        createAt: String
        confirmado: Boolean
    }

    type Asana {
        id: ID
        idUser: ID
        nombre: String
        file: String
        typeFile: String
        descripcion: String
        beneficios: String
        frase: String
        createAt: String
    }

    type Token {
        token: String
    }

    type ImagenAsana {
        status: Boolean
        urlImagen: String
    }


    # Inputs

    input userInput {
        nombre: String!
        apellido: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input AsanaInput {
        nombre: String!
        descripcion: String!
        beneficios: String!
        typeFile: String
    }

    type Query {
        #User
        getUser(id: ID, username: String): User

        #Asana
        getAsanas(username: String): [Asana]
    }

    type Mutation {
        #User
        register(input: userInput): User
        login(input: LoginInput): Token

        # Asana
        newAsana(input: AsanaInput): Asana
        uploadImage(file: Upload): ImagenAsana
    }

`;

module.exports = typeDefs;