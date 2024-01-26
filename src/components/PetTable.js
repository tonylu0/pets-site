// PetTable.js
import React from 'react';
import './PetTable.css'; // Assuming you have a CSS file for styling

const PetTable = ({ pets }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>PetID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {pets.map(pet => (
          <tr key={pet.PetID}>
            <td>{pet.PetID}</td>
            <td>{pet.Name}</td>
            <td>{pet.Type}</td>
            <td>{pet.Age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PetTable;
