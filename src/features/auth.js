import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	isAuthenticated: false,
	sessionId: "",
};

const authSlices = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.sessionId = localStorage.getItem("session_id");

			localStorage.setItem("accountId", action.payload.id);
		},
	},
});

export const { setUser } = authSlices.actions;

export default authSlices.reducer;
