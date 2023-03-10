import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: any;
}

const SearchBar = ({ value, onChange, onBlur }: SearchBarProps) => {
  return (
    <TextField
      autoFocus
      style={styles.searchBar}
      placeholder="Search for apps & games"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

const styles = {
  searchBar: {
    boxShadow: "0px 15px 10px -15px #111",
    width: "55%",
  },
};

export default SearchBar;
