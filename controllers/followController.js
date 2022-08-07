const Follow = require('../models/follow');
const User = require('../models/user');

async function followUser(username, ctx) {
    const userFound = await User.findOne({username});
    if(!userFound) throw new Error('Usuario no encontrado');
    try {
        const newFollow = new Follow({
            idUser: ctx.user.id,
            follow: userFound._id
        });
        newFollow.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function unFollow(username, ctx) {
    const userFound = await User.findOne({username});
    if(!userFound) throw new Error('Usuario no encontrado');
    const follow = await Follow.deleteOne({idUser: ctx.user.id}).where('follow').equals(userFound._id);
    if(follow.deletedCount > 0) {
        return true
    } else {
        return false
    }
}

async function isFollow(username, ctx) {
    const userFound = await User.findOne({username});
    if(!userFound) throw new Error('Usuario no encontrado');
    const follow = await Follow.find({idUser: ctx.user.id}).where('follow').equals(userFound._id);
    if(follow.length > 0) {
        return true
    } else {
        return false
    }
}

async function getUserFollowers(username) {
    const user = await User.findOne({username});
    const followers = await Follow.find({follow: user._id}).populate('idUser');
    const followersList = [];
    for await(const data of followers) {
        followersList.push(data.idUser);
    }
    return followersList;
}

async function getUserFolloweds(username) {
    const user = await User.findOne({username});
    const followeds = await Follow.find({idUser: user._id}).populate('follow');

    const followedList = [];
    for await (const data of followeds) {
        followedList.push(data.follow)
    }

    return followedList;
}


module.exports = {
    followUser,
    unFollow,
    isFollow,
    getUserFollowers,
    getUserFolloweds

}