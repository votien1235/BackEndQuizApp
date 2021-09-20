const UserRepo = require("../repositories/user");
const User = require("../model/user")


module.exports.signIn = async (username, password) => {
    const user = await UserRepo.findUserByUsername(username);
    if (!user
    ) {
        throw new Error("Username not existed!")
    }
    if (!user.verifyPassword(password)) {
        throw new Error("Password not correct!")
    }
    const jwt = user.generateToken()
    return { jwt, user }
}

module.exports.signUp = async (username, password) => {
    const user = await UserRepo.findUserByUsername(username);
    if (user) {
        throw new Error("Username existed!");
    }
    const newUser = new User(username);
    newUser.generatePassword(password);
    const savedUser = await UserRepo.createUser(newUser);
    return savedUser
};


module.exports.updateProfile = async (user, { displayName, photoUrl }) => {
    user.displayName = displayName;
    user.photoUrl = photoUrl;

    const updatedUser = await UserRepo.updateUser(user);
    return updatedUser
}

module.exports.changePassword = async (user, { currentPassword, newPassword }) => {
    if (!user.verifyPassword(currentPassword)) {
        throw new Error('Password not correct')
    }
    user.generatePassword(newPassword);
    await UserRepo.changePassword(user);
    return user;
}
module.exports.updateHighScore = async (user, { highestScore }) => {
    user.highestScore = highestScore;
    const updatedUser = await UserRepo.updateHighScore(user)
    return updatedUser
}