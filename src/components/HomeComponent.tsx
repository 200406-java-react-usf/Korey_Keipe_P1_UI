import React from 'react';
import { makeStyles } from '@material-ui/core'
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';
import { grey, cyan, teal } from '@material-ui/core/colors';

const primary = grey[500]; // #F44336
const accent = teal[900]; // #E040FB

interface IHomeProps {
	authUser: User;
	setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    Container: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
		padding: 20,
		background: primary
    },
    Form: {
		width: "50%",
		color: accent,
		fontWeight: 'bold'
    }
});

const HomeComponent = (props: IHomeProps) => {
	
	const classes = useStyles();

	return (
		// !props.authUser ?
		// <Redirect to="/login" /> :
		<>
			<div className={classes.Container}>
				<h1> Welcome, {props.authUser?.username}!</h1>
			</div>
		</>	
	);
}

export default HomeComponent;