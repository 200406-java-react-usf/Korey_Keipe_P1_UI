import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUsers, logOut } from '../remote/user-service';
import { Button } from '@material-ui/core'
import { User } from '../models/user';

interface IHomeProps {
	username: string;
	authUser: User;
    setAuthUser: (user: User) => void;    
}

const HomeComponent = (props: IHomeProps) => {
	
	let logout = async () => {
		await logOut();
		//@ts-ignore
		props.setAuthUser(null);
	}
	return (
		!props.username ?
		<Redirect to="/login" /> :
		<>
			<h1> Welcome, {props.username}!</h1>
			<Button onClick={getUsers} variant="contained" color="primary" size="medium">Get Users</Button>
			<br/>
			<Button onClick={logout} variant="contained" color="primary" size="medium">Log Out</Button>

		</>	
	);
}

export default HomeComponent;