import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { searchCleared, searchQueryChanged } from "@/models/search/actions";
import {
  selectSearchError,
  selectSearchQuery,
  selectSearchStatus,
} from "@/models/search/selectors";

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const status = useSelector(selectSearchStatus);
  const error = useSelector(selectSearchError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchQueryChanged({ query: e.target.value }));
  };

  const handleClear = () => {
    dispatch(searchCleared());
  };

  const helperText =
    status === "loading"
      ? "Searching..."
      : status === "error"
        ? `Error: ${error ?? "Search failed"}`
        : query.trim().length === 1
          ? "Type at least 2 characters"
          : " ";

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        fullWidth
        size="small"
        error={status === "error"}
        helperText={helperText}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear} aria-label="Clear search">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
