const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function crearToken(user, SECRET_KEY, expiresIn) {
    const {id, nombre, email, username} = user;
    const payload = {
        id,
        nombre,
        email,
        username
    };
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

async function userRegister(input) {
    //Validacio
    input.email = input.email.toLowerCase();
    input.username = input.username.toLowerCase();

    const {email, password, username} = input;

    const existeEmail = await User.findOne({email});
    const existeUser = await User.findOne({username})
    if(existeEmail) {
        throw new Error('Este email ya esta registrado')
    }
    if(existeUser) {
        throw new Error('Este Usuario ya esta registrado')
    }
    //Hashear Password
    const salt = await bcryptjs.genSalt(10);
    input.password = await bcryptjs.hash(password, salt);


    try {
        const newUser = new User(input);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.log(error)
    }
}
async function getUser(id, username) {
    let user = null;
    if(id) user = await User.findById(id);
    if(username) user = await User.findOne({username});
    if(!user) throw new Error('El usuario no existe');
    return user;
}
async function loginUser(input) {
    const {email, password} = input;
    const existeEmail = await User.findOne({email: email.toLowerCase()});
    if(!existeEmail) throw new Error('Error al instroducir el email o el password');

    const passwordSucces = await bcryptjs.compare(password, existeEmail.password);
    if(!passwordSucces) throw new Error('Error en el email o password');

    return {
        token: crearToken(existeEmail, process.env.SECRET_KEY, "365d")
    }

}

async function updateUser(input, ctx) {
    const {id} = ctx.user;
    try {
        if(input.currentPassword && input.newPassword) {
            //Cambiar Password
            const userFound = await User.findById(id);
            const passwordSucces = await bcryptjs.compare(input.currentPassword, userFound.password);
            if(!passwordSucces) throw new Error('Datos incorrectos');
            const salt = await bcryptjs.genSaltSync(10);
            const newPasswordCrypt = await bcryptjs.hash(input.newPassword, salt);
            await User.findByIdAndUpdate(id, {password: newPasswordCrypt})
        } else {
            await User.findByIdAndUpdate(id, input);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function busqueda(search) {
    const users = await User.find({
        nombre: {$regex: search, $options: 'i'}
    });
    return users;
}

module.exports = {
    userRegister,
    getUser,
    loginUser,
    updateUser,
    busqueda
}
