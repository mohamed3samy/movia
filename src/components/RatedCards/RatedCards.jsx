import { Box, Typography } from "@mui/material";
import Movie from "../Movie/Movie";
import useStyles from "./styles";

const RatedCards = ({ title, movies }) => {
	const classes = useStyles();

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				{title}
			</Typography>
			<Box className={classes.container}>
				{movies?.results.map((movie, index) => (
					<Movie key={movie.id} movie={movie} index={index} />
				))}
			</Box>
		</Box>
	);
};

export default RatedCards;
