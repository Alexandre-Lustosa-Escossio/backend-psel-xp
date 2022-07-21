require('dotenv').config({path: __dirname + '/../../../.env'});

module.exports = {
  development: {
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    host: process.env.DB_HOST ,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: 'root' ,
    password: 'trybe' ,
    database: 'xp_backend_test' ,
    host: 'localhost' ,
    dialect: 'mysql' ,
  }
};
