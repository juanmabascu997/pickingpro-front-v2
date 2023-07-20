import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Icon } from '@mui/material';

function SearchBar({loading, handleChange}) {
  return (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                handleChange(e.target.value);
            }}
            label="Ingresa el pedidoID"
            variant="outlined"
            placeholder="Search..."
            size="small"
            disabled={loading}
            onSubmit={(e)=>{handleChange(e.target.value);}}
        />
    </form>
    )
}

export default SearchBar