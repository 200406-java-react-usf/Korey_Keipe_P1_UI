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
import { registerUser } from '../remote/user-service';
import { NewUser } from '../models/newUser';
import { User } from '../models/user';

interface IRegisterProps {
    authUser: User;
    errorMessage: string;
    setNewUser: (newUser: NewUser) => void;
}

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

function RegisterComponent(props: IRegisterProps) {

	const classes = useStyles();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState ('');
	const [email, setEmail] = useState ('');
    const [role_id, setRole] = useState (1);
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

	let register = async () => {

        try{
		let user = new NewUser(username, password, firstName, lastName, email, role_id);
		let newUser = await registerUser(user);
		props.setNewUser(newUser)
		console.log(newUser);	
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
                    <Button onClick={register} variant="contained" color="primary" size="medium">Register</Button>
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

export default RegisterComponent;