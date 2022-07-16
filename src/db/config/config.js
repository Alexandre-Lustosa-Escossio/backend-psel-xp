require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "trybe",
    "database": process.env.DB_NAME || "xp_backend",
    "host": process.env.DB_HOST || "localhost",
    "dialect": process.env.DB_DIALECT || 'mysql',
  }
}
