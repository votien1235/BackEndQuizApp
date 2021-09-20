const crypto = require("crypto");
const jwt = require("jsonwebtoken");




class User {
    username;
    password;
    salt;
    photoUrl;
    displayName;
    highestScore;
    constructor(username, displayName, photoUrl, highestScore) {
        this.username = username;
        this.displayName = displayName;
        this.photoUrl = photoUrl;
        this.highestScore = highestScore;
    }

    generatePassword(password) {
        this.salt = crypto.randomBytes(128).toString("base64");
        this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    }

    verifyPassword(password) {
        const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
        return this.password === hashedPassword
    }

    generateToken() {
        return jwt.sign({ username: this.username }, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });
    }

    toJson() {
        return {
            username: this.username,
            photoUrl: this.photoUrl,
            displayName: this.displayName,
            highestScore: this.highestScore
        }
    };
}

module.exports = User;