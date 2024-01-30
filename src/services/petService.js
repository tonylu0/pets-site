// Pet API functions

// Function to update pets table
export const refreshPetTable = (updateStateFunction) => {
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
      updateStateFunction(filteredItems);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      alert('Failed to fetch data: ' + error.message);
    });
};

// Function to get a single pet
export const handleGetPet = (ID) => {
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

// Function to post new pet
export const handlePostPet = async (newPet) => {
  try {
    const response = await fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPet),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json();
    alert('Pet added: ' + JSON.stringify(newPet));
  } catch (error) {
    alert('Error adding new pet: ' + error.message);
  }
};

// Function to update pet
export const handlePutPet = async (ID, updatePet) => {
  try {
    // Await the fetch call to complete and get the response
    const response = await fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/' + ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePet),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Await the parsing of the response body as JSON
    await response.json();

    alert('Pet updated: ' + JSON.stringify(updatePet));
  } catch (error) {
    console.error('Error updating pet:', error);
    alert('Failed to update pet: ' + error.message);
  }
};

// Function to delete pet
export const handleDeletePet = async (deletePetID) => {
  try {
    const response = await fetch('https://zrsfhdj0q8.execute-api.us-east-1.amazonaws.com/prod/Pets/' + deletePetID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.Attributes) {
      alert('Pet deleted: ' + JSON.stringify(data.Attributes));
    } else {
      alert('Pet not found or already deleted.');
    }
  } catch (error) {
    alert('Error deleting pet: ' + error.message);
  }
};
