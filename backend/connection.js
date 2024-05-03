const mongoose = require('mongoose');

const DBconnection = async () => {
try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`connected to db ${conn.connection.host}`)
    }
    catch (error){
    console.log(error)
    }
}

 module.exports = DBconnection;