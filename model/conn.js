const mongoose = require("mongoose");

const ConnectDB = async (DATABASE_URL)=>{
    try {
        await mongoose.connect(DATABASE_URL)
        .then(()=> console.log("Connection Successfull..."))
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectDB;