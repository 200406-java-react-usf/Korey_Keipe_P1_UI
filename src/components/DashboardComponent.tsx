import React from 'react';
import { User } from "../models/user";
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IDashboardProps {
	authUser: User;
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
	},
	title: {
		flexGrow: 1,
	},
	link: {
        textDecoration: 'none',
        color: 'white'
    }
});

function DashboardComponent(props: IDashboardProps) {

    const classes = useStyles();

	return (
		
		<>
			<Typography variant="h6" className={classes.title}>
						{ props.authUser ? <Link to="/users" className={classes.link}>Get Users</Link> : <></> }
			</Typography>

			<Typography variant="h6" className={classes.title}>
						{ props.authUser ? <Link to="/register" className={classes.link}>Register</Link> :	<></> }
			</Typography>
		</>
	);
}

export default DashboardComponent;
