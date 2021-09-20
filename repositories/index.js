const mongodb = require("mongodb");


const db = {
    users: null
};

const client = new mongodb.MongoClient("mongodb://localhost:27017");
client.connect().then(() => {
    console.log("mongodb connected!")
    const database = client.db("x-music");
    db.users = database.collection("users");
});


module.exports = db;