import React from 'react';
import { User } from "../models/user";
import { Typography, makeStyles, Grid, Theme, createStyles, Paper } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { grey, cyan, teal } from '@material-ui/core/colors';

const primary = grey[500]; // #F44336
const accent = teal[900]; // #E040FB

interface IDashboardProps {
	authUser: User;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
	theme:{
		background: primary
	},
    root: {
	  flexGrow: 1,
	},
    paper: {
      padding: theme.spacing(2),
	  textAlign: 'center',
	  background: primary,
	  justifyContent: 'center'
	},
	link: {
        textDecoration: 'none',
		color: accent,
		fontWeight: 'bold'
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
						<Grid container spacing={3} >
							<Grid item xs >
								<Paper className={classes.paper}><Link to="/register" className={classes.link}>NEW USER</Link></Paper>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs>
								<Paper className={classes.paper}><Link to="/users" className={classes.link}>ALL USERS</Link></Paper>
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
									<Paper className={classes.paper}><Link to="/reimbursements" className={classes.link}>VIEW REIMBURSEMENTS</Link></Paper>
								</Grid>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="/submit" className={classes.link}>NEW REIMBURSEMENT</Link></Paper>
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
									<Paper className={classes.paper}><Link to={`/reimbursements`} className={classes.link}>MY REIMBURSEMENTS</Link></Paper>
								</Grid>
								<Grid item xs>
									<Paper className={classes.paper}><Link to="/submit" className={classes.link}>NEW REIMBURSEMENT</Link></Paper>
								</Grid>
							</Grid>
					</>
					: <></> }

				</div>

		</>
	);
}

export default DashboardComponent;
