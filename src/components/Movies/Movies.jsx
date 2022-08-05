import { useState, useEffect } from "react";
import {
	Box,
	CircularProgress,
	useMediaQuery,
	Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Loader from "../UI/Loader";
import Pagination from "../Pagination/Pagination";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";

const Movies = () => {
	const [page, setPage] = useState(1);

	const { genreIdOrCategoryName, searchQuery } = useSelector(
		(state) => state.currentGenreOrCategory
	);

	const { data, error, isFetching } = useGetMoviesQuery({
		genreIdOrCategoryName,
		page,
		searchQuery,
	});

	const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));

	const numberOfMovies = lg ? 17 : 21;

	if (isFetching) return <Loader />;

	if (!data.results.length) {
		return (
			<Box display="flex" justifyContent="center" mt="1.2rem">
				<Typography variant="h4">
					No movies that match name
					<br />
					Please search for something else.
				</Typography>
			</Box>
		);
	}

	if (error) return "An error has occurred";

	return (
		<>
			<FeaturedMovie movie={data.results[0]} />
			<MovieList
				movies={data}
				numberOfMovies={numberOfMovies}
				excludeFirst
			/>
			<Pagination
				currentPage={page}
				setPage={setPage}
				totalPages={data.total_pages}
			/>
		</>
	);
};

export default Movies;
