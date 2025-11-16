require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE,
});

// Track model
const Track = sequelize.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
    }
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await sequelize.sync({ force: true });
        console.log('Tables created.');

        await sequelize.close();
        console.log('Database closed.');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initializeDatabase();

module.exports = { sequelize, Track };
