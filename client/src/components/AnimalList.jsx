import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimalList = ({ onEdit, onDelete }) => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/animals')
      .then(response => setAnimals(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Animals List</h1>
      <ul>
        {animals.map(animal => (
          <li key={animal._id} className="mb-2">
            {animal.name} - {animal.species} ({animal.age} years old)
            <button onClick={() => onEdit(animal)} className="ml-4 text-blue-500">Edit</button>
            <button onClick={() => onDelete(animal._id)} className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalList;
