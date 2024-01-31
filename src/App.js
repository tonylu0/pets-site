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

  const handleUpdatePetAndRefresh = async (ID, updatePetID) => {
    await handlePutPet(ID, updatePetID); // Wait for the pet to be updated
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
        <div className="forms-container">
          <NewPetForm onNewPet={async (newPet) => { await handlePostPet(newPet); refreshPetTable(setPets); }} /> {/* Wait for pet to be created and refresh */}
          <UpdatePetForm onGetPet={handleGetPet} onUpdatePet={handleUpdatePetAndRefresh} /> {/* Example of using separate function handleUpdatePetAndRefresh instead of inline */}
          <DeletePetForm onDeletePet={async (deletePetID) => { await handleDeletePet(deletePetID); refreshPetTable(setPets); }} /> {/* Wait for pet to be deleted and refresh */}
        </div>
        <PetTable pets={pets} /> {/* Pets Table */}
      </header>
    </div>
  );
}

export default App;
