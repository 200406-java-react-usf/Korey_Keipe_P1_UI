import React from 'react';
import { getUsers, logOut } from '../remote/user-service';
import { Button, makeStyles } from '@material-ui/core'
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';

interface IHomeProps {
	username: string;
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

	let logout = async () => {
		await logOut();
		//@ts-ignore
		props.setAuthUser(null);
		console.log('Logged out');
	}

	return (
		// !props.username ?
		// <Redirect to="/login" /> :
		<>
			<div className={classes.Container}>
				<h1> Welcome, {props.username}!</h1>
					<br/><br/>
						<Button onClick={() => <Redirect to={"/users"} />} variant="contained" color="primary" size="medium">Get Users</Button>
					<br/><br/>
					<p>
						
					</p>
					<Button onClick={logout} variant="contained" color="primary" size="medium">Log Out</Button>
			</div>
		</>	
	);
}

export default HomeComponent;