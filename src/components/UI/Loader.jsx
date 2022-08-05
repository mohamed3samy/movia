import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100vh"
		>
			<CircularProgress size="4rem" />
		</Box>
	);
};

export default Loader;
