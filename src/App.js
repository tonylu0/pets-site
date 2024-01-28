import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MyButton from './components/MyButton';
import PetTable from './components/PetTable';
import NewPetForm from './components/NewPetForm';
import DeletePetForm from './components/DeletePetForm';
import UpdatePetForm from './components/UpdatePetForm';

function App() {
  const [pets, setPets] = useState([]); // Initialize pets state

  // Update table on first website load
  useEffect(() => {
    refreshPetTable();
  }, []);

  // Function to update pets table
  const refreshPetTable = () => {
    fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Extract the 'Items' array from the response
        const petItems = data.Items;
  
        // Filter out items where PetID is 0
        const filteredItems = petItems.filter(item => item.PetID !== 0);
  
        // Sort the filtered items by PetID in ascending order
        filteredItems.sort((a, b) => a.PetID - b.PetID);
  
        // Update the state with the sorted and filtered pets data
        setPets(filteredItems);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch data: ' + error.message);
      });
  };


  const handleGetPet = (ID) => {
    // Send the new pet data to API
    return fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/' + ID)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data; // Return the data for further processing
    })
    .catch(error => {
      console.error('Error getting pet:', error);
      throw error; // Rethrow error for further handling
    });
  };

  const handlePostPet = (newPet) => {
    // Send the new pet data to API
    fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/', {
      method: 'POST',
      body: JSON.stringify(newPet),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      refreshPetTable();
      alert('Pet added: ' + JSON.stringify(newPet));
    })
    .catch(error => {
      alert('Error adding new pet:', error);
    });
  };

  const handlePutPet = (ID, updatePet) => {
    // Send the new pet data to API
    fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/' + ID, {
      method: 'PUT',
      body: JSON.stringify(updatePet),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      refreshPetTable();
      alert('Pet updated: ' + JSON.stringify(updatePet));
    })
    .catch(error => {
      console.error('Error updating pet:', error);
      alert('Failed to update pet: ' + error.message);
    });
  };

  const handleDeletePet = (deletePet) => {
    // Send the new pet data to API
    fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/' + deletePet, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.Attributes) {
        refreshPetTable();
        alert('Pet deleted: ' + JSON.stringify(data.Attributes));
      } else {
        alert('Pet not found or already deleted.');
      }
    })
    .catch(error => {
      alert('Error deleting pet:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="title-box">
          <h1>Pet Database</h1>
        </div>
        <MyButton onUpdate={refreshPetTable} />
        <PetTable pets={pets} /> {/* Include the PetTable component */}
        <div className="forms-container">
          <NewPetForm onNewPet={handlePostPet} />
          <UpdatePetForm onGetPet={handleGetPet} onUpdatePet={handlePutPet} />
          <DeletePetForm onDeletePet={handleDeletePet} />
        </div>
      </header>
    </div>
  );
}

export default App;
