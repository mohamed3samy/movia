import { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import useStyles from "./styles";
import useAlan from "./utils/Alan";

import Movies from "./components/Movies/Movies";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Actors from "./components/Actors/Actors";

function App() {
	const classes = useStyles();
	const alanBtnContainer = useRef();
	const location = useLocation();

	useAlan();

	setTimeout(() => {
		if (location.pathname === "/approved") window.location.href = "/";
	}, 500);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Routes>
					<Route exact path="/" element={<Movies />} />
					<Route path="/approved" element={<Movies />} />
					<Route
						exact
						path="/movie/:id"
						element={<MovieInfo />}
					/>
					<Route
						exact
						path="/profile/:id"
						element={<Profile />}
					/>
					<Route exact path="/actors/:id" element={<Actors />} />
				</Routes>
			</main>
			<div ref={alanBtnContainer}></div>
		</div>
	);
}

export default App;
