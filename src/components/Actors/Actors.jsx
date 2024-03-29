import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import useStyles from "./styles";
import {
	useGetActorsDetailsQuery,
	useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Loader from "../UI/Loader";
import Pagination from "../Pagination/Pagination";

const Actors = () => {
	const [page, setPage] = useState(1);
	const classes = useStyles();
	const navigate = useNavigate();
	const { id } = useParams();
	const { data, isFetching, error } = useGetActorsDetailsQuery(id);
	const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

	console.log(data);

	if (isFetching) return <Loader />;

	if (error) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Button
					color="primary"
					startIcon={<ArrowBack />}
					onClick={() => navigate(-1)}
				>
					Go Back
				</Button>
			</Box>
		);
	}

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={5} xl={4}>
					<img
						className={classes.image}
						src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
						alt={data.name}
					/>
				</Grid>

				<Grid
					item
					lg={7}
					xl={8}
					style={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Typography variant="h2" gutterBottom>
						{data?.name}
					</Typography>
					<Typography variant="h5" gutterBottom>
						Born: {new Date(data?.birthday).toDateString()}
					</Typography>
					<Typography variant="body1" align="justify" paragraph>
						{data?.biography || "Sorry, no biography yet..."}
					</Typography>
					<Box className={classes.btns}>
						<Button
							variant="contained"
							color="primary"
							target="_blank"
							href={`https://www.imdb.com/name/${data?.imdb_id}`}
						>
							IMDB
						</Button>
						<Button
							color="primary"
							startIcon={<ArrowBack />}
							onClick={() => navigate(-1)}
						>
							Back
						</Button>
					</Box>
				</Grid>
			</Grid>

			<Box margin="2rem 0">
				<Typography variant="h2" gutterBottom align="center">
					Movies
				</Typography>
				{movies && (
					<MovieList movies={movies} numberOfMovies={10} />
				)}
				<Pagination
					currentPage={page}
					setPage={setPage}
					totalPages={movies?.total_pages}
				/>
			</Box>
		</>
	);
};

export default Actors;
