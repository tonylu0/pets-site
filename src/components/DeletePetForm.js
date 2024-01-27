import React, { useState } from 'react';
// import './NewPetForm.css';

function DeletePetForm({ onDeletePet }) {
  const [ID, setID] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form refresh submit action

    // Construct the new pet object
    const deletePet = ID;

    // Call the function passed from the parent component to handle the new pet
    onDeletePet(deletePet);

    // Clear the form fields
    setID('');
  };

  return (
    <div className="form-box">
      <h2 style={{ color: 'black', marginTop: '0px', marginBottom: '4px' }}>Delete Pet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ID">ID:</label>
          <input
            id="ID"
            type="number"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">Delete Pet</button>
      </form>
    </div>
  );
}

export default DeletePetForm;
