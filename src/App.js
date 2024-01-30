import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MyButton from './components/MyButton';
import PetTable from './components/PetTable';
import NewPetForm from './components/NewPetForm';
import DeletePetForm from './components/DeletePetForm';
import UpdatePetForm from './components/UpdatePetForm';

import { refreshPetTable, handleGetPet, handlePostPet, handlePutPet, handleDeletePet } from './services/petService';

function App() {
  const [pets, setPets] = useState([]); // Initialize pets state

  // Update table on first website load
  useEffect(() => {
    refreshPetTable(setPets);
  }, []);

  const handleNewPetAndRefresh = async (newPet) => {
    await handlePostPet(newPet); // Wait for the pet to be posted
    refreshPetTable(setPets);    // Then refresh the pet table
  };

  const handleUpdatePetAndRefresh = async (ID, updatePetID) => {
    await handlePutPet(ID, updatePetID); // Wait for the pet to be updated
    refreshPetTable(setPets);    // Then refresh the pet table
  };

  const handleDeletePetAndRefresh = async (deletePetID) => {
    await handleDeletePet(deletePetID); // Wait for the pet to be deleted
    refreshPetTable(setPets);    // Then refresh the pet table
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="title-box">
          <h1>Pet Database</h1>
        </div>
        <MyButton onUpdate={() => refreshPetTable(setPets)} /> {/* Wrap refreshPetTable in another function to pass in setPets*/}
        <PetTable pets={pets} /> {/* Include the PetTable component */}
        <div className="forms-container">
          <NewPetForm onNewPet={handleNewPetAndRefresh} />
          <UpdatePetForm onGetPet={handleGetPet} onUpdatePet={handleUpdatePetAndRefresh} />
          <DeletePetForm onDeletePet={handleDeletePetAndRefresh} />
        </div>
      </header>
    </div>
  );
}

export default App;
