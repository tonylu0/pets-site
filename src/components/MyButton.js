import React from 'react';

function MyButton({ onUpdate }) {
  function handleClick() {
    if (onUpdate) {
      onUpdate(); // Call the update function passed via props
    }
  }

  return (
    <button onClick={handleClick}>
      Click me to refresh Pet table
    </button>
  );
}

export default MyButton;
