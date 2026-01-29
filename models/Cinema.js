const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    // Aquí conectamos con la colección de Movies usando sus IDs
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
  },
  {
    timestamps: true,
  }
);

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;