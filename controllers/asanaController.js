const Asana = require('../models/asana');
const User = require('../models/user');
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

module.exports = {
    newAsana,
    getAsanas,
    uploadImage
}