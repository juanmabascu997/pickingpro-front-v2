import React from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

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
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
    </form>
    )
}

export default SearchBar