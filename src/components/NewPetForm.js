import React, { useState } from 'react';
import './NewPetForm.css';

function NewPetForm({ onNewPet }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form refresh submit action

    // Construct the new pet object
    const newPet = { name: name, type: type, age: parseInt(age, 10) };

    // Call the function passed from the parent component to handle the new pet
    onNewPet(newPet);

    // Clear the form fields
    setName('');
    setType('');
    setAge('');
  };

  return (
    <div className="form-box">
      <h2 style={{ color: 'black', marginTop: '0px', marginBottom: '4px' }}>Add Pet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}


export default NewPetForm;
