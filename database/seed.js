require('dotenv').config();
const { sequelize, Track } = require('./setup');

// Sample track data
const sampleTracks = [
  {
    songTitle: "Wanna Be Startin' Somethin'",
    artistName: "Michael Jackson",
    albumName: "Thriller",
    genre: "Pop",
    duration: 362,
    releaseYear: 1982
  },
  {
    songTitle: "Purple Rain",
    artistName: "Prince",
    albumName: "Purple Rain",
    genre: "Rock",
    duration: 512,
    releaseYear: 1984
  }
];

async function seedDatabase() {
  try {
    await sequelize.sync();

    await Track.bulkCreate(sampleTracks);
    console.log("Database seeded successfully.");

    await sequelize.close();
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

seedDatabase();

