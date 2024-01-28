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

    onGetPet(ID).then(pet => {
      console.log(JSON.stringify(pet.Item));
      setName(pet.Item.Name);
      setType(pet.Item.Type);
      setAge(pet.Item.Age.toString()); // Explicitly show age is stored as a string in react
    })
    .catch(error => {
      console.log(error);
      alert("Pet with PetID " + ID + " does not exist");
      setName('');
      setType('');
      setAge('');
    });
  };

  // Function to handle updating pet details
  const handleUpdatePet = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const updatePet = { name: name, type: type, age: parseInt(age, 10) };
    onUpdatePet(ID, updatePet);

    setName('');
    setType('');
    setAge('');
  };

  return (
    <div className="form-box">
      <h2 style={{ color: 'black', marginTop: '0px', marginBottom: '4px' }}>Update Pet</h2>
      <form>
        <div className="form-group">
          <label htmlFor="ID">ID:</label>
          <input
            id="ID"
            type="number"
            value={ID}
            onChange={(e) => {
              const newID = e.target.value;
              if (newID >= 1) {
                setID(newID);
              } else {
                alert("ID must be greater than 0");
                setID('');
              }
            }}
            required
          />
        </div>
        <button onClick={handleGetPet}>Get Pet</button> {/* Button to fetch pet details */}
        
        {/* Pet details form */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          />
        </div>
        <button onClick={handleUpdatePet}>Update Pet</button> {/* Button to submit updates */}
      </form>
    </div>
  );
}

export default UpdatePetForm;