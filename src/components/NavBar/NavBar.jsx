import {
	AccountCircle,
	Brightness4,
	Brightness7,
	Menu,
} from "@mui/icons-material";
import {
	AppBar,
	Avatar,
	Button,
	Drawer,
	IconButton,
	Toolbar,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setUser } from "../../features/auth";
import { createSessionId, fetchToken, moviesApi } from "../../utils/index";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import useStyles from "./styles";

const NavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const classes = useStyles();
	const isMobile = useMediaQuery("(max-width:600px)");
	const theme = useTheme();
	const dispatch = useDispatch();

	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const colorMode = useContext(ColorModeContext);

	const token = localStorage.getItem("request_token");
	const sessionIdFromLocalStorage = localStorage.getItem("session_id");

	useEffect(() => {
		const logInUser = async () => {
			if (token) {
				if (sessionIdFromLocalStorage) {
					const { data: userData } = await moviesApi.get(
						`/account?session_id=${sessionIdFromLocalStorage}`
					);

					dispatch(setUser(userData));
				} else {
					const sessionId = await createSessionId();
					const { data: userData } = await moviesApi.get(
						`/account?session_id=${sessionId}`
					);

					dispatch(setUser(userData));
				}
			}
		};

		logInUser();
	}, [token, dispatch, sessionIdFromLocalStorage]);

	return (
		<>
			<AppBar position="fixed">
				<Toolbar className={classes.toolbar}>
					{isMobile && (
						<IconButton
							color="inherit"
							edge="start"
							style={{ outline: "none" }}
							onClick={() =>
								setMobileOpen(
									(prevMobileOpen) => !prevMobileOpen
								)
							}
							className={classes.menuButton}
						>
							<Menu />
						</IconButton>
					)}
					<IconButton
						color="inherit"
						sx={{ ml: 1 }}
						onClick={colorMode.toggleColorMode}
					>
						{theme.palette.mode === "dark" ? (
							<Brightness7 width="100%" height="100%" />
						) : (
							<Brightness4 width="100%" height="100%" />
						)}
					</IconButton>

					{!isMobile && <Search />}

					<div>
						{!isAuthenticated ? (
							<Button color="inherit" onClick={fetchToken}>
								Login &nbsp; <AccountCircle />
							</Button>
						) : (
							<Button
								color="inherit"
								component={Link}
								to={`/profile/${user.id}`}
								className={classes.linkButton}
							>
								{!isMobile && <>My Movies &nbsp;</>}

								<Avatar
									style={{ width: 30, height: 30 }}
									alt="Profile"
									src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
								/>
							</Button>
						)}
					</div>
					{isMobile && <Search />}
				</Toolbar>
			</AppBar>

			<div>
				<nav className={classes.drawer}>
					{isMobile ? (
						<Drawer
							variant="temporary"
							anchor="right"
							open={mobileOpen}
							onClose={() =>
								setMobileOpen(
									(prevMobileOpen) => !prevMobileOpen
								)
							}
							className={classes.drawerBackground}
							classes={{ Paper: classes.drawerPaper }}
							ModalProps={{ keepMounted: true }}
						>
							<Sidebar setMobileOpen={setMobileOpen} />
						</Drawer>
					) : (
						<Drawer
							classes={{ paper: classes.drawerPaper }}
							variant="permanent"
							open
						>
							<Sidebar setMobileOpen={setMobileOpen} />
						</Drawer>
					)}
				</nav>
			</div>
		</>
	);
};

export default NavBar;
