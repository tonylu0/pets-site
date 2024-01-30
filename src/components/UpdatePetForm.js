import React, { useState } from 'react';
import './NewPetForm.css';

function UpdatePetForm({ onGetPet, onUpdatePet }) {
  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');

  // Function to handle fetching pet details
  const handleGetPet = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    // Reject invalid PetIDs
    if (ID === '') {
      console.log("PetID must not be blank")
      alert("PetID must not be blank");
      setID('');
      return;
    } else if (ID < 1) {
      console.log("PetID must be > 0")
      alert("PetID must be > 0");
      setID('');
      return;
    }

    // Use passed in function onGetPet to fetch pet using API
    onGetPet(ID).then(pet => {
      console.log(JSON.stringify(pet.Item));
      setName(pet.Item.Name);
      setType(pet.Item.Type);
      setAge(pet.Item.Age.toString()); // Explicitly show age is stored as a string in react
    })
    .catch(error => {
      if (ID === '') {
        console.log("PetID must not be blank")
        alert("PetID must not be blank");
      } else {
        console.log(error);
        alert("Pet with PetID " + ID + " does not exist");
      }

      // Reset fields after error
      setID('');
      setName('');
      setType('');
      setAge('');
    });
  };

  // Function to handle updating pet details
  const handleUpdatePet = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const updatePet = { name: name, type: type, age: parseInt(age, 10) }; // Convert age to int for API
    onUpdatePet(ID, updatePet); // Use passed in function onUpdatePet to update pet using API

    setID('');
    setName('');
    setType('');
    setAge('');
  };

  return (
    <div className="form-box">
      <h2 style={{ color: 'black', marginTop: '0px', marginBottom: '4px' }}>Update Pet</h2>
      <form onSubmit={handleUpdatePet}>

        {/* Get PetID */}
        <div className="form-group">
          <label htmlFor="ID">ID:</label>
          <input
            id="ID"
            type="number"
            value={ID}
            onChange={(e) => {
              setID(e.target.value);
            }}
            required
          />
        </div>
        <button onClick={handleGetPet}>Get Pet</button>
        
        {/* Pet details form */}
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
            min="1"
            required
          />
        </div>
        <button type="submit">Update Pet</button>
      </form>
    </div>
  );
}

export default UpdatePetForm;