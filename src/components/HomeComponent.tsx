import React from 'react';
import { makeStyles } from '@material-ui/core'
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';

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
        padding: 20
    },
    Form: {
        width: "50%"
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