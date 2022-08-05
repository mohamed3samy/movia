import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
	imageLink: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "10% 0",
	},
	image: {
		width: "50%",
	},
	links: {
		color: theme.palette.text.primary,
		textDecoration: "none",
	},
	genreImages: {
		filter: theme.palette.mode === "dark" && "invert(1)",
	},
}));
