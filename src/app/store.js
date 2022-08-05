import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "../services/TMDB";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import authReducer from "../features/auth";

const store = configureStore({
	reducer: {
		[tmdbApi.reducerPath]: tmdbApi.reducer,
		currentGenreOrCategory: genreOrCategoryReducer,
		auth: authReducer,
	},
});

export default store;
