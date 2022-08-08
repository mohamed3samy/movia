import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
	moviesContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 0,
		overflow: "hidden",
		[theme.breakpoints.down("md")]: {
			justifyContent: "center",
		},
		[theme.breakpoints.up("xl")]: {
			gap: "5px",
		},
	},
}));
