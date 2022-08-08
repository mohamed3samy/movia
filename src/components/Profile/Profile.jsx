import { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { useGetListQuery } from "../../services/TMDB";
import RatedCards from "../RatedCards/RatedCards";

const Profile = () => {
	const lsSessionId = localStorage.getItem("session_id");
	const { user } = useSelector((state) => state.auth);
	const { data: favoriteMovies, refetch: refetchFavorites } =
		useGetListQuery({
			listName: "favorite/movies",
			accountId: user.id,
			sessionId: lsSessionId,
			page: 1,
		});
	const { data: watchlistMovies, refetch: refetchWatchlisted } =
		useGetListQuery({
			listName: "watchlist/movies",
			accountId: user.id,
			sessionId: lsSessionId,
			page: 1,
		});

	useEffect(() => {
		refetchFavorites();
		refetchWatchlisted();
	}, [refetchFavorites, refetchWatchlisted]);

	const logout = () => {
		localStorage.clear();
		window.location.href = "/";
	};

	return (
		<Box overflow="hidden">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				marginTop="0.5rem"
				marginBottom="2rem"
			>
				<Typography variant="h5">My Profile</Typography>
				<Button color="inherit" onClick={logout}>
					Logout &nbsp; <ExitToApp />
				</Button>
			</Box>
			{!favoriteMovies?.results?.length &&
			!watchlistMovies?.results?.length ? (
				<Typography variant="h4">
					Add favourite or watchlist same movies to see them
					here!
				</Typography>
			) : (
				<Box overflow="hidden">
					<RatedCards
						title="Favorite Movies"
						movies={favoriteMovies}
					/>
					<RatedCards
						title="Watchlist"
						movies={watchlistMovies}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Profile;
