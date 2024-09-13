import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimalForm = ({ currentAnimal, onSave }) => {
  const [animal, setAnimal] = useState({ name: '', species: '', age: '' });

  useEffect(() => {
    if (currentAnimal) {
      setAnimal(currentAnimal);
    }
  }, [currentAnimal]);

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAnimal) {
      axios.put(`http://localhost:5000/animals/${currentAnimal._id}`, animal)
        .then(response => onSave(response.data))
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:5000/animals', animal)
        .then(response => onSave(response.data))
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-bold mb-2">{currentAnimal ? 'Edit Animal' : 'Add New Animal'}</h2>
      <input
        type="text"
        name="name"
        value={animal.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="species"
        value={animal.species}
        onChange={handleChange}
        placeholder="Species"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="age"
        value={animal.age}
        onChange={handleChange}
        placeholder="Age"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Save</button>
    </form>
  );
};

export default AnimalForm;
