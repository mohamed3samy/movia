import { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ColorModeContext } from "./ToggleColorMode";
import { fetchToken } from "./index";
import {
	selectGenreOrCategory,
	searchMovie,
} from "../features/currentGenreOrCategory";

const useAlan = () => {
	const { setMode } = useContext(ColorModeContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		alanBtn({
			key: process.env.REACT_APP_ALAN_SDK_KEY,
			onCommand: ({
				command,
				mode,
				genres,
				genreOrCategory,
				query,
			}) => {
				if (command === "chooseGenre") {
					const foundGenre = genres.find(
						(g) =>
							g.name.toLowerCase() ===
							genreOrCategory.toLowerCase()
					);
					if (foundGenre) {
						navigate("/");
						dispatch(selectGenreOrCategory(foundGenre.id));
					} else {
						const category = genreOrCategory.startsWith("top")
							? "top_rated"
							: genreOrCategory;
						navigate("/");
						dispatch(selectGenreOrCategory(category));
					}
				} else if (command === "changeMode") {
					if (mode === "light") {
						setMode("light");
					} else {
						setMode("dark");
					}
				} else if (command === "login") {
					fetchToken();
				} else if (command === "logout") {
					localStorage.clear();
					window.location.href = "/";
				} else if (command === "search") {
					dispatch(searchMovie(query));
				}
			},
		});
	}, [dispatch, navigate, setMode]);

	return <div>Alan</div>;
};

export default useAlan;
