import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
	makeStyles,
	Select
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { updateUser, deleteById } from '../remote/user-service';
import { NewUser } from '../models/newUser';
import { User } from '../models/user';
import { Link } from 'react-router-dom';
import { grey, cyan, teal } from '@material-ui/core/colors';

const primary = grey[500]; // #F44336
const accent = teal[900]; // #E040FB

interface IUpdateUserProps {
	authUser: User;
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
		},
		link: {
			textDecoration: 'none',
			color: accent,
			fontWeight: 'bold'
		}
	});
	
		const classes = useStyles();
	
		const [user_id, setUserId] = useState(props.thisUser.user_id);
		const [username, setUsername] = useState(props.thisUser.username);
		const [password, setPassword] = useState(props.thisUser.password);
		const [first_name, setFirstName] = useState(props.thisUser.first_name);
		const [last_name, setLastName] = useState (props.thisUser.last_name);
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
			let newUpdate = new User(user_id, username, password, first_name, last_name, email, role_id);
			let updatedUser = await updateUser(newUpdate);
			props.setNewUser(updatedUser)
			} catch (e) {
				setErrorMessage(e);
			}
		}

		let remove = async () => {

			try {
				let response = await deleteById(props.thisUser.user_id);
				return response;
			} catch (e) {
				setErrorMessage(e);
			}
		}
	
	return (
			
		<>
				<div className={classes.registerContainer}>
					<form className={classes.registerForm}>
						<br/><br/>
						<Typography align="center" variant="h4">Update User</Typography>
	
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
								value={first_name}
								id="firstName" type="text"
								placeholder="Enter first name"/>
						</FormControl>
	
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="lastName">Last Name</InputLabel>
							<Input 
								onChange={updateLastName}
								value={last_name}
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
					
						<FormControl>
                        <InputLabel htmlFor="age-native-simple">Role</InputLabel>
                            <Select native onChange = {updateRole}>
                                <option aria-label="None" value={role_id} />
                                <option value = {1}>Admin</option>
                                <option value = {2}>Manager</option>
                                <option value = {3}>User</option>
                            </Select>
                    	</FormControl>

							<br/><br/>
							<Link to="/dashboard" onClick={update} className={classes.link}> UPDATE </Link>
							<br/><br/>
							{ props.authUser.role_id === 1 ? 
							<Link to="/dashboard" onClick={remove} className={classes.link}> REMOVE </Link>
							:
							<></> }
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
