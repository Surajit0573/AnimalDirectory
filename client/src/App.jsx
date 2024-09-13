import React, { useState } from 'react';
import AnimalList from './components/AnimalList';
import AnimalForm from './components/AnimalForm';
import axios from 'axios';
const App = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);

  const handleSave = (updatedAnimal) => {
    setCurrentAnimal(null);
  };

  const handleEdit = (animal) => {
    setCurrentAnimal(animal);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/animals/${id}`)
      .then(() => {
        setCurrentAnimal(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <AnimalForm currentAnimal={currentAnimal} onSave={handleSave} />
      <AnimalList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
