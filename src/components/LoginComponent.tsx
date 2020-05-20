 import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    makeStyles 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { authenticate } from '../remote/auth-service';
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';

import { teal, cyan, grey } from '@material-ui/core/colors';

const primary = teal[500]; 
const accent = cyan[900];
const container = grey[800]; 

interface ILoginProps {
    authUser: User | undefined;
    setAuthUser: (user: User) => void;  
    errorMessage: string;  
}

const useStyles = makeStyles({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    loginForm: {
        width: "50%",
    },
    link: {
        textDecoration: 'none',
        color: accent,
        fontWeight: 'bold'
    }
});

function LoginComponent(props: ILoginProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value)
    }
    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async () => {

		let authUser = await authenticate(username, password);
        props.setAuthUser(authUser);
        console.log(authUser);
    }

    return (
        props.authUser ?
        <Redirect to="/dashboard" /> :
        <>
            <div className={classes.loginContainer}>
                <form className={classes.loginForm}>
                    <br/><br/>
                    <Typography align="center" variant="h4">Login</Typography>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                            onChange={updateUsername} 
                            value={username} 
                            id="username" type="text" 
                            placeholder="Enter your username" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            onChange={updatePassword}
                            value={password}
                            id="password" type="password"
                            placeholder="Enter your password"/>
                    </FormControl>
                    <br/><br/>
                        <Link to="/dashboard" onClick={login} className={classes.link}> LOGIN </Link>
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
    );
}

export default LoginComponent;
