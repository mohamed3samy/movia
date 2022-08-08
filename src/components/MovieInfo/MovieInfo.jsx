import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
	Modal,
	Typography,
	Button,
	ButtonGroup,
	Grid,
	Box,
	Rating,
} from "@mui/material";
import {
	Movie as MovieIcon,
	Theaters,
	Language,
	PlusOne,
	Favorite,
	FavoriteBorderOutlined,
	Remove,
	ArrowBack,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useStyles from "./styles";
import {
	useGetMovieQuery,
	useGetRecommendationsQuery,
	useGetListQuery,
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import MovieList from "../MovieList/MovieList";
import Loader from "../UI/Loader";
import genreIcons from "../../assets/genres";

const MovieInfo = () => {
	const [open, setOpen] = useState(false);
	const [isMovieFavorited, setIsMovieFavorited] = useState(false);
	const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

	const { id } = useParams();
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const lsSessionId = localStorage.getItem("session_id");

	const { data, isFetching, error } = useGetMovieQuery(id);
	const { data: recommendations } = useGetRecommendationsQuery({
		movie_id: id,
		list: "/recommendations",
	});

	const { data: favoriteMovies } = useGetListQuery({
		listName: "favorite/movies",
		accountId: user.id,
		sessionId: lsSessionId,
		page: 1,
	});
	const { data: watchlistMovie } = useGetListQuery({
		listName: "watchlist/movies",
		accountId: user.id,
		sessionId: lsSessionId,
		page: 1,
	});

	useEffect(() => {
		setIsMovieFavorited(
			!!favoriteMovies?.results?.find(
				(movie) => movie?.id === data?.id
			)
		);
	}, [favoriteMovies, data]);

	useEffect(() => {
		setIsMovieWatchlisted(
			!!watchlistMovie?.results?.find(
				(movie) => movie?.id === data?.id
			)
		);
	}, [watchlistMovie, data]);

	//* add movie to favorites
	const addToFavorites = async () => {
		await axios.post(
			`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${lsSessionId}`,
			{
				media_type: "movie",
				media_id: id,
				favorite: !isMovieFavorited,
			}
		);

		setIsMovieFavorited((prev) => !prev);
	};

	//* add movie to watchlist
	const addToWatchList = async () => {
		await axios.post(
			`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${lsSessionId}`,
			{
				media_type: "movie",
				media_id: id,
				watchlist: !isMovieWatchlisted,
			}
		);

		setIsMovieWatchlisted((prev) => !prev);
	};

	if (isFetching) return <Loader />;

	if (error) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Link to="/">Something went wrong - Go back.</Link>
			</Box>
		);
	}

	return (
		<Grid container className={classes.containerSpaceAround}>
			<Grid
				item
				sm={12}
				lg={4}
				align="center"
				style={{ marginBottom: "2rem" }}
			>
				<img
					src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
					className={classes.poster}
					alt={data.title}
				/>
			</Grid>

			<Grid item container direction="column" lg={7}>
				<Typography
					className={classes.movieTitle}
					variant="h3"
					align="center"
					gutterBottom
				>
					{data?.title} ({data.release_date.split("-")[0]})
				</Typography>
				<Typography variant="h5" align="center" gutterBottom>
					{data?.tagline}
				</Typography>
				<Grid item className={classes.containerSpaceAround}>
					<Box display="flex" align="center">
						<Rating readOnly value={data.vote_average / 2} />
						<Typography
							gutterBottom
							variant="subtitle1"
							style={{ marginLeft: "10px" }}
						>
							{data?.vote_average} / 10
						</Typography>
					</Box>
					<Typography gutterBottom variant="h6" align="center">
						{data?.runtime}min | Language:{" "}
						{data.spoken_languages[0].name}
					</Typography>
				</Grid>
				<Grid item className={classes.genresContainer}>
					{data?.genres?.map((genre) => (
						<Link
							className={classes.links}
							key={genre.name}
							to="/"
							onClick={() =>
								dispatch(selectGenreOrCategory(genre.id))
							}
						>
							<img
								src={genreIcons[genre.name.toLowerCase()]}
								className={classes.genreImage}
								alt={genre.name}
								height={30}
							/>
							<Typography
								color="textPrimary"
								variant="subtitle1"
							>
								{genre.name}
							</Typography>
						</Link>
					))}
				</Grid>
				<Typography
					variant="h5"
					gutterBottom
					style={{ marginTop: "20px" }}
				>
					Overview
				</Typography>
				<Typography style={{ marginBottom: "2rem" }}>
					{data?.overview}
				</Typography>
				<Typography variant="h5" gutterBottom>
					Top Cast
				</Typography>

				<Grid item container spacing={2}>
					{data &&
						data?.credits?.cast
							?.map(
								(character, i) =>
									character.profile_path && (
										<Grid
											key={i}
											item
											xs={4}
											md={2}
											component={Link}
											to={`/actors/${character.id}`}
											style={{
												textDecoration: "none",
											}}
										>
											<img
												className={
													classes.castImage
												}
												src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
												alt={character.name}
											/>
											<Typography
												color="textPrimary"
												align="center"
											>
												{character?.name}
											</Typography>
											<Typography
												color="textSecondary"
												align="center"
											>
												{
													character?.character.split(
														"/"
													)[0]
												}
											</Typography>
										</Grid>
									)
							)
							.slice(0, 6)}
				</Grid>

				<Grid item container style={{ marginTop: "2rem" }}>
					<div className={classes.buttonContainer}>
						<Grid
							item
							xs={12}
							sm={6}
							className={classes.buttonContainer}
						>
							<ButtonGroup size="small" variant="outlined">
								<Button
									target="_blank"
									rel="noopener noreferrer"
									href={data?.homepage}
									endIcon={<Language />}
								>
									Website
								</Button>
								<Button
									target="_blank"
									rel="noopener noreferrer"
									href={`https://www.imdb.com/title/${data?.imdb_id}`}
									endIcon={<MovieIcon />}
								>
									IMDB
								</Button>
								<Button
									onClick={() => setOpen(true)}
									href="#"
									endIcon={<Theaters />}
								>
									Trailer
								</Button>
							</ButtonGroup>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							className={classes.buttonContainer}
						>
							<ButtonGroup size="small" variant="outlined">
								<Button
									onClick={addToFavorites}
									endIcon={
										isMovieFavorited ? (
											<FavoriteBorderOutlined />
										) : (
											<Favorite />
										)
									}
								>
									{isMovieFavorited
										? "Unfavorite"
										: "Favorite"}
								</Button>
								<Button
									onClick={addToWatchList}
									endIcon={
										isMovieWatchlisted ? (
											<Remove />
										) : (
											<PlusOne />
										)
									}
								>
									Watchlist
								</Button>
								<Button
									onClick={() => navigate(-1)}
									endIcon={<ArrowBack />}
								>
									<Typography
										variant="subtitle2"
										color="inherit"
									>
										Back
									</Typography>
								</Button>
							</ButtonGroup>
						</Grid>
					</div>
				</Grid>
			</Grid>

			<Box marginTop="5rem" width="100%">
				<Typography variant="h3" gutterBottom align="center">
					You might also like
				</Typography>
				{recommendations ? (
					<MovieList
						movies={recommendations}
						numberOfMovies={10}
					/>
				) : (
					<Box>Sorry, nothing was found.</Box>
				)}
			</Box>

			<Modal
				closeAfterTransition
				className={classes.modal}
				open={open}
				onClose={() => setOpen(false)}
			>
				{data?.videos?.results?.length > 0 && (
					<iframe
						autoPlay
						className={classes.video}
						frameBorder="0"
						title="Trailer"
						src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
						allow="autoplay"
					/>
				)}
			</Modal>
		</Grid>
	);
};

export default MovieInfo;
