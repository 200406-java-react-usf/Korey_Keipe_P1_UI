import React from 'react';
import { User } from '../models/user';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
	Typography,
	AppBar,
	Toolbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { logOut } from '../remote/user-service';

import { teal, cyan } from '@material-ui/core/colors';

const primary = cyan[500]; // #F44336
const accent = teal[900]; // #E040FB

export interface INavbarProps {
	authUser: User;
	setAuthUser: (user: User) => void;
}

const userStyles = makeStyles((theme: Theme) =>
	createStyles({
	theme:{
		background: primary
	},
	root:{
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontWeight: 'bold'
	},
	link: {
        textDecoration: 'none',
		color: accent,
		fontWeight: 'bold'
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
			<AppBar className={classes.theme} position="fixed">
				<Toolbar>
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