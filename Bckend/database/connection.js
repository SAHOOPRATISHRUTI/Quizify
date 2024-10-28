const mongoose = require('mongoose');

// Corrected 'MONOGO_URI' to 'MONGO_URI'
const dbURL = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbURL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting to DB: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDB;
