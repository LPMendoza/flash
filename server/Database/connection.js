const Sequelize = require('sequelize');
const keys = require("./conf");

// Option 1: Passing parameters separately
const sequelize = new Sequelize(keys.database, keys.databaseUser, keys.dataBasePass, {
    host: 'localhost',
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/*sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });*/

module.exports = sequelize
