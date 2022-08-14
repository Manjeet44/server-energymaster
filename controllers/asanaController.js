const Asana = require('../models/asana');
const User = require('../models/user');
const Follow = require('../models/follow');
const Like = require('../models/likes');
const {createWriteStream} = require('fs');
const awsUploadImage = require('../utils/aws-upload-image');

const { v4: uuidv4 } = require('uuid');
//TODO: Logica pujar imatge

async function newAsana(input, file, ctx) {
    const {nombre, descripcion, beneficios} = input;
    const {createReadStream, mimetype} = await file;
    const extension = mimetype.split('/')[1];
    const fileName = `nueva-asana/${uuidv4()}.${extension}`;
    const fileData = createReadStream();
    try {
        const result = await awsUploadImage(fileData, fileName);
        const asanaNew = new Asana({
            idUser: ctx.user.id,
            nombre,
            descripcion,
            beneficios,
            file: result,
            typeFile: mimetype.split('/')[0],
            createAt: Date.now()
        });
        asanaNew.save();
        return {
            asanaNew
        }
    } catch (error) {
        console.log(error);
    }
}

async function getAsanas(username, ctx) {
    const user = await User.findOne({username});
    if(!user) throw new Error('Usuario no Encontrado');

    const asanasAll = await Asana.find().where({idUser: user._id}).sort({createAt: -1});
    return asanasAll;

}

//Guardar imagen carpeta local
const saveImagesWithStream = ({filename, mimetype, stream}) => {
    const path = `imagenes/${filename}`;
    return new Promise((resolve, reject) => {
        stream
            .pipe(createWriteStream(path))
            .on("finish", () => resolve({path, filename, mimetype}))
            .on("error", reject);
    }
)};

async function uploadImage(file, ctx) {
    // const {filename, mimetype, createReadStream} = await file;
    // const stream = await createReadStream();
    // await saveImagesWithStream({filename, mimetype, stream});
    // return "singleUpload"
    const {username, id} = ctx.user;
    const {createReadStream, mimetype} = await file;
    const extension = mimetype.split("/")[1];
    const imageName = `avatar/${username}.${extension}`;
    const fileData = await createReadStream();

    try {
        const result = await awsUploadImage(fileData, imageName);
        await User.findByIdAndUpdate(id, {avatar: result});
        return {
            status: true,
            urlImagen: result
          }
        
    } catch (error) {
        return {
            status: false,
            urlAvatar: null
        }
    }


}

async function getAsana(id, ctx) {
    const asana = await Asana.findById(id);
    if(!asana) throw new Error('Esta Asana no existe');
    return asana;
}

async function getAsanaFolloweds(ctx) {
    //Obtener todos los usuarios al que sigue el usuario ctx
    const followeds = await Follow.find({idUser: ctx.user.id}).populate('follow');
    const followedsList = [];
    
    for await (const data of followeds) {
        followedsList.push(data.follow);
    }

    const asanaList = [];
    for await ( const data of followedsList) {
        const asanas = await Asana.find().where({
            idUser: data._id
        }).sort({createAt: -1}).populate('idUser').limit(8)
        
        asanaList.push(...asanas); //Si feim una copia amb spreatOperator farem una copia des constingut de dins s'array, es a dir esobjectes que te. Si no feim sa copia ens faria una copia de s'array amb es objectes dins
    }
    const result = asanaList.sort((a, b)=> {
        return new Date(b.createAt) - new Date(a.createAt)
    });
    return result;
}

async function getAsanaByLike(ctx) {
    //Obtener todos los usuarios al que sigue el usuario ctx
    const liked = await Like.find({idUser: ctx.user.id}).populate('idAsana');
    const likedList = [];
    
    for await (const data of liked) {
        likedList.push(data.idAsana);
    }

    return likedList;

}

async function deleteAsana(idAsana, ctx) {
    try {
        const deleteAsana = await Asana.findOneAndDelete({_id: idAsana}).where({idUser: ctx.user.id});
        if(!deleteAsana) throw new Error('Hubo un Error');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function editarAsana(idAsana, input, ctx) {
    const updateAsana = await Asana.findByIdAndUpdate({_id: idAsana}, input, {new: true}).where({idUser: ctx.user.id});
    if(!updateAsana) throw new Error('No se pudo actualizar');
    return updateAsana;
}


module.exports = {
    newAsana,
    getAsanas,
    uploadImage,
    getAsana,
    getAsanaFolloweds,
    getAsanaByLike,
    deleteAsana,
    editarAsana
}