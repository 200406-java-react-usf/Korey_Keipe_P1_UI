import React from 'react';
import { User } from "../models/user";
import { Typography, makeStyles, Grid, Theme, createStyles, Paper } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

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
      color: theme.palette.text.primary,
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
		!props.authUser ?
		<Redirect to="/login"/> :
		<>
				<div className={classes.root}>
					{props.authUser.role_id === 1 ?
					<>

					<Typography align="center" variant="h4">
							ADMIN DASHBOARD
					</Typography>
						<Grid container spacing={3}>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="/users" className={classes.link}>USERS</Link></Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>REIMBURSEMENTS</Link></Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>...</Link></Paper>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="/register" className={classes.link}>ADD USER</Link></Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>REMOVE USER</Link></Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>UPDATE USER</Link></Paper>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>ADD USER</Link></Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>REMOVE USER</Link></Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="" className={classes.link}>UPDATE USER</Link></Paper>
							</Grid>
						</Grid>
						</>
						: <></> }
						{props.authUser.role_id === 2 ?
						<>
						<Typography align="center" variant="h4">
							MANAGER DASHBOARD
						</Typography>
							<Grid container spacing={3}>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="" className={classes.link}>ADD</Link></Paper>
								</Grid>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="" className={classes.link}>REMOVE</Link></Paper>
								</Grid>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="" className={classes.link}>EDIT</Link></Paper>
								</Grid>
							</Grid>
					</>
					: <></> }
					{props.authUser.role_id === 3 ?
					<>
						<Typography align="center" variant="h4">
							USER DASHBOARD
						</Typography>
							<Grid container spacing={3}>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="" className={classes.link}>MY REIMBURSEMENTS</Link></Paper>
								</Grid>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="" className={classes.link}>MY PROFILE</Link></Paper>
								</Grid>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="" className={classes.link}>NEW REIMBURSEMENT</Link></Paper>
								</Grid>
							</Grid>
					</>
					: <></> }

				</div>

		</>
	);
}

export default DashboardComponent;
