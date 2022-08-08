import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/styles";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetGenresQuery } from "../../services/TMDB";
import useStyles from "./styles";
import Loader from "../UI/Loader";
import genreIcons from "../../assets/genres";
import blueLogo from "../../assets/images/blueLogo.png";
import redLogo from "../../assets/images/redLogo.png";

const categories = [
	{ label: "Popular", value: "popular" },
	{ label: "Top Rated", value: "top_rated" },
	{ label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
	const { genreIdOrCategoryName } = useSelector(
		(state) => state.currentGenreOrCategory
	);
	const theme = useTheme();
	const classes = useStyles();
	const { data, isFetching } = useGetGenresQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		setMobileOpen(false);
	}, [setMobileOpen, genreIdOrCategoryName]);

	return (
		<>
			<Link to="/" className={classes.imageLink}>
				<img
					className={classes.image}
					src={
						theme.palette.mode === "light" ? blueLogo : redLogo
					}
					alt="Moviller logo"
				/>
			</Link>

			<Divider />

			<List>
				<ListSubheader>Categories</ListSubheader>
				{categories.map(({ label, value }) => (
					<Link to="/" key={value} className={classes.links}>
						<ListItem
							onClick={() =>
								dispatch(selectGenreOrCategory(value))
							}
							button
						>
							<ListItemIcon>
								<img
									src={genreIcons[label.toLowerCase()]}
									className={classes.genreImages}
									height={30}
									alt="logo"
								/>
							</ListItemIcon>
							<ListItemText primary={label} />
						</ListItem>
					</Link>
				))}
			</List>

			<Divider />

			<List>
				<ListSubheader>Genres</ListSubheader>
				{isFetching ? (
					<Loader />
				) : (
					data.genres.map(({ name, id }) => (
						<Link to="/" key={id} className={classes.links}>
							<ListItem
								onClick={() =>
									dispatch(selectGenreOrCategory(id))
								}
								button
							>
								<ListItemIcon>
									<img
										src={
											genreIcons[name.toLowerCase()]
										}
										className={classes.genreImages}
										height={30}
										alt="logo"
									/>
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItem>
						</Link>
					))
				)}
			</List>
		</>
	);
};

export default Sidebar;
