const e = require('express');
const User = require('../model/user');
const db = require('./index');

exports.findUserByUsername = async (username) => {
    const rawUser = await db.users.findOne({ username: username });
    if (!rawUser) {
        return null
    }
    const user = new User(rawUser.username, rawUser.displayName, rawUser.photoUrl, rawUser.highestScore);
    user.password = rawUser.password
    user.salt = rawUser.salt
    return user;
}

exports.createUser = async (user) => {
    await db.users.insert({
        username: user.username,
        password: user.password,
        salt: user.salt,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        highestScore: user.highestScore
    })

};

//update profile
exports.updateUser = async (user) => {
    await db.users.findOneAndUpdate({ username: user.username }, {
        $set: {
            photoUrl: user.photoUrl,
            displayName: user.displayName
        },
    }, {
        returnOriginal: false
    });
    return new User(user.username, user.displayName, user.photoUrl, user.highestScore);

}

exports.changePassword = async (user) => {
    await db.users.findOneAndUpdate({ username: user.username }, {
        $set: {
            password: user.password,
            salt: user.salt
        },
    }, {
        returnOriginal: false
    });

}
exports.updateHighScore = async (user) => {
    await db.users.findOneAndUpdate({ username: user.username }, {
        $set: {
            highestScore: user.highestScore
        },
    }, {
        returnOriginal: false
    });
    return new User(user.username, user.displayName, user.photoUrl, user.highestScore);
}