import React from 'react';
import { User } from "../models/user";
import { Typography, makeStyles, Grid, Theme, createStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IDashboardProps {
	authUser: User;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
	},
	link: {
        textDecoration: 'none',
        color: 'white'
    }
  }),
);

function DashboardComponent(props: IDashboardProps) {

    const classes = useStyles();

	return (
		
		<>
				<div className={classes.root}>
					{props.authUser.role_id === 1 ?
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.paper}><Link to="/users" className={classes.link}>Get Users</Link></Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper}><Link to="/register" className={classes.link}>Register</Link></Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper}>xs</Paper>
						</Grid>
					</Grid>
					: <></> }
					{props.authUser.role_id === 2 ?
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.paper}>Manger Stuff</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>xs=6</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper}>xs</Paper>
						</Grid>
					</Grid>
					: <></> }
					{props.authUser.role_id === 3 ?
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.paper}>User Stuff</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>xs=6</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper}>xs</Paper>
						</Grid>
					</Grid>
					: <></> }

				</div>

		</>
	);
}

export default DashboardComponent;
