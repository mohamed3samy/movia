import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { searchMovie } from "../../features/currentGenreOrCategory";
import useStyles from "./styles";

const Search = () => {
	const [query, setQuery] = useState();
	const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			dispatch(searchMovie(query));
		}
	};

	if (location.pathname !== "/") return null;

	

	return (
		<div className="searchContainer">
			<TextField
				onKeyPress={handleKeyPress}
				vlaue={query}
				onChange={(e) => setQuery(e.target.value)}
				variant="standard"
				InputProps={{
					className: classes.input,
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
};

export default Search;
