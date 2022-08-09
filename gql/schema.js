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
        description: String
        siteWeb: String
        createAt: String
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

    type ImagenAvatar {
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
        file: String
        typeFile: String
    }

    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        siteWeb: String
        description: String
    }

    type Query {
        #User
        getUser(id: ID, username: String): User

        #Asana
        getAsanas(username: String): [Asana]
        getAsana(id: ID!): Asana

        # Follow
        isFollow(username: String!): Boolean
        getFollowers(username: String!): [User]
        getFolloweds(username: String!): [User]
    }

    type Mutation {
        #User
        register(input: userInput): User
        login(input: LoginInput): Token
        updateUser(input: UserUpdateInput): Boolean

        # Asana
        newAsana(input: AsanaInput, file: Upload): Asana
        uploadImage(file: Upload): ImagenAvatar

        # Folows
        followUser(username: String!) : Boolean
        unFollow(username: String!): Boolean

         # Likes
        addLike(idAsana: ID!) : Boolean
        deleteLike(idAsana: ID!): Boolean
    }

`;

module.exports = typeDefs;