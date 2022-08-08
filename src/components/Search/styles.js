import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
	searchContainer: {
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			justifyContent: "center",
			width: "100%",
		},
	},
	input: {
		fontSize: "1.2rem !important",
		color: theme.palette.mode === "light" && "black",
		filter: theme.palette.mode === "light" && "invert(1)",
		[theme.breakpoints.down("sm")]: {
			margin: "-0.7rem 0 0 2rem",
		},
	},
}));
