import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
	container: {
		display: "flex",
		overflow: "hidden",
		flexWrap: "wrap",
		margin: "1.2rem 0",
		[theme.breakpoints.down("sm")]: {
			justifyContent: "center",
		},
	},
}));
