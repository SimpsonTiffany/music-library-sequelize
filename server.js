const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, Track } = require('./database/setup');

const app = express();
app.use(express.json());
app.use(cors());

// GET all tracks
app.get('/api/tracks', async (req, res) => {
    const tracks = await Track.findAll();
    res.json(tracks);
});

// GET track by ID
app.get('/api/tracks/:id', async (req, res) => {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
        return res.status(404).json({ error: "Track not found" });
    }

    res.json(track);
});

// POST create new track
app.post('/api/tracks', async (req, res) => {
    const { songTitle, artistName, albumName, genre } = req.body;

    // required fields validation
    if (!songTitle || !artistName || !albumName || !genre) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const track = await Track.create(req.body);
    res.status(201).json(track);
});

// PUT update track
app.put('/api/tracks/:id', async (req, res) => {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
        return res.status(404).json({ error: "Track not found" });
    }

    await track.update(req.body);
    res.json({ message: "Track updated successfully" });
});

// DELETE track
app.delete('/api/tracks/:id', async (req, res) => {
    const deleted = await Track.destroy({
        where: { trackId: req.params.id }
    });

    if (deleted === 0) {
        return res.status(404).json({ error: "Track not found" });
    }

    res.json({ message: "Track deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
