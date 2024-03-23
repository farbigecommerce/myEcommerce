import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ onSearchChange }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    onSearchChange(value); // Call the parent component's onSearchChange function
  };

  return (
    <TextField
    sx={{ mb: 2, ml:1, width:"100%" ,pr:2}}
      id="outlined-multiline-flexible"
      label="Search..."
      size="small"
      value={searchText}
      onChange={handleSearchInputChange}
    />
  );
}

export default SearchBar;
