if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema and Model
const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
});

const Animal = mongoose.model('Animal', animalSchema);

// CRUD Routes
app.get('/animals', async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
});

app.post('/animals', async (req, res) => {
  const animal = new Animal(req.body);
  await animal.save();
  res.json(animal);
});

app.put('/animals/:id', async (req, res) => {
  const { id } = req.params;
  const animal = await Animal.findByIdAndUpdate(id, req.body, { new: true });
  res.json(animal);
});

app.delete('/animals/:id', async (req, res) => {
  const { id } = req.params;
  await Animal.findByIdAndDelete(id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
