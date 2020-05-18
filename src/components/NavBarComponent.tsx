import React from 'react';
import { User } from '../models/user';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
	Typography,
	AppBar,
	Toolbar,
	IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { logOut } from '../remote/user-service';

interface INavbarProps {
	authUser: User;
	setAuthUser: (user: User) => void;
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
	},
	link: {
        textDecoration: 'none',
        color: 'white'
    }
	}),
);

const NavbarComponent = (props: INavbarProps) => {

	const classes = userStyles();

	let logout = async () => {
		await logOut();
		//@ts-ignore
		props.setAuthUser(null);
		console.log('Logged out');
	}

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" className={classes.title}>
						{ props.authUser ? <Link to="/dashboard" className={classes.link}>{props.authUser.username} </Link> : <></> }
					</Typography>
					<Typography>
						{ props.authUser 
							? 
							<Link to="" onClick={logout} className={classes.link}> LOGOUT</Link>
						 	: 
							<Link to="/login" className={classes.link}> LOGIN </Link>
						}
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default NavbarComponent;