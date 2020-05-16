import React from 'react';
import { User } from '../models/user';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface INavbarProps {
	authUser: User;
}

const userStyles = makeStyles((theme: Theme) =>
	createStyles({
	root:{
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	}
	}),
);

const NavbarComponent = (props: INavbarProps) => {

	const classes = userStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Home
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>

		</>
	)
}

export default NavbarComponent;