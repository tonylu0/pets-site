import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MyButton from './components/MyButton';
import PetTable from './components/PetTable';
import NewPetForm from './components/NewPetForm';

function App() {
  const [pets, setPets] = useState([]); // Initialize pets state

  // Function to update pets data
  const updatePets = () => {
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
        console.log('Data received from API:', filteredItems);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch data: ' + error.message);
      });
  };

  useEffect(() => {
    updatePets();
  }, []);

  const handleNewPet = (newPet) => {
    // Send the new pet data to API
    fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPet),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the successful addition of a new pet
      updatePets();
    })
    .catch(error => {
      alert('Error adding new pet:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="title-box">
          <h1>Pet Database</h1>
        </div>
        <MyButton onUpdate={updatePets} />
        <PetTable pets={pets} /> {/* Include the PetTable component */}
        <NewPetForm onNewPet={handleNewPet} />
      </header>
    </div>
  );
}

export default App;
