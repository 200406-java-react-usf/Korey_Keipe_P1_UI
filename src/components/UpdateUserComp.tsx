import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { updateUser } from '../remote/user-service';
import { NewUser } from '../models/newUser';
import { User } from '../models/user';

interface IUpdateUserProps {
	thisUser: User;
	setThisUser: (user: NewUser) => void;
	setNewUser: (newUser: NewUser) => void;
}

function UpdateUserComp (props: IUpdateUserProps) {

	const useStyles = makeStyles({
		registerContainer: {
			display: "flex",
			justifyContent: "center",
			margin: 20,
			marginTop: 40,
			padding: 20
		},
		registerForm: {
			width: "50%"
		}
	});
	
		const classes = useStyles();
	
		const [username, setUsername] = useState(props.thisUser.username);
		const [password, setPassword] = useState(props.thisUser.password);
		const [firstName, setFirstName] = useState(props.thisUser.firstName);
		const [lastName, setLastName] = useState (props.thisUser.lastName);
		const [email, setEmail] = useState (props.thisUser.email);
		const [role_id, setRole] = useState (props.thisUser.role_id);
		const [errorMessage, setErrorMessage] = useState ('');
	
		let updateUsername = (e: any) => {
			setUsername(e.target.value);
		}
	
		let updatePassword = (e: any) => {
			setPassword(e.target.value);
		}
	
		let updateFirstName = (e: any) => {
			setFirstName(e.target.value);
		}
	
		let updateLastName = (e: any) => {
			setLastName(e.target.value);
		}
		
		let updateEmail = (e: any) => {
			setEmail(e.target.value);
		}
	
		let updateRole = (e: any) => {
			setRole(e.target.value);
		}
	
		let update = async () => {
	
			try{
			let newUpdate = new NewUser(username, password, firstName, lastName, email, role_id);
			let updatedUser = await updateUser(newUpdate);
			props.setNewUser(updatedUser)
			console.log(updatedUser);	
			} catch (e) {
				setErrorMessage(e);
			}
		}
	
	return (
			
		<>
				<div className={classes.registerContainer}>
					<form className={classes.registerForm}>
						<br/><br/>
						<Typography align="center" variant="h4">Register</Typography>
	
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="username">Username</InputLabel>
							<Input 
								onChange={updateUsername} 
								value={username} 
								id="username" type="text" 
								placeholder="Enter username" />
						</FormControl>
	
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input 
								onChange={updatePassword}
								value={password}
								id="password" type="password"
								placeholder="Enter password"/>
						</FormControl>
	
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="firstName">First Name</InputLabel>
							<Input 
								onChange={updateFirstName}
								value={firstName}
								id="firstName" type="text"
								placeholder="Enter first name"/>
						</FormControl>
	
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="lastName">Last Name</InputLabel>
							<Input 
								onChange={updateLastName}
								value={lastName}
								id="lastName" type="text"
								placeholder="Enter last name"/>
						</FormControl>
	
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input 
								onChange={updateEmail}
								value={email}
								id="email" type="text"
								placeholder="Enter email"/>
						</FormControl>
						
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="role_id">Role</InputLabel>
							<Input 
								onChange={updateRole}
								value={role_id}
								id="role" type="text"
								placeholder="Enter user role"/>
						</FormControl>
						<br/><br/>
						<Button onClick={update} variant="contained" color="primary" size="medium">Update</Button>
						<br/><br/>
						{
							errorMessage
							? 
							<Alert severity="error"> {errorMessage} </Alert>
							:
							<></>
						}
					</form>
				</div>
			</>
		)
}

export default UpdateUserComp;
