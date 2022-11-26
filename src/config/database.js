const dotEnv = require('dotenv/config');

const urlMongoDB = process.env.MONGO_URL;

module.exports = {urlMongoDB};