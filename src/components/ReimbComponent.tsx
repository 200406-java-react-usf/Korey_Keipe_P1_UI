import React, { useEffect, useState, SyntheticEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Reimb } from '../models/reimb';
import { getReimbs, getReimbById } from '../remote/reimb-service';
import { IconButton, CardHeader, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControl, InputLabel, Select } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { User } from '../models/user';
import { Link } from 'react-router-dom';
import { grey, cyan, teal } from '@material-ui/core/colors';

const primary = grey[500]; // #F44336
const accent = teal[900]; // #E040FB

interface IReimbProps {
	authUser: User;
	setThisReimb: (reimb: Reimb) => void;
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({  
		root: {
			minWidth: 275,
			maxWidth: '50%',
			margin: 'auto',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			background: primary
		},
		bullet: {
			display: 'flex',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		title: {
			fontSize: 14,
		},
		pos: {
			marginBottom: 12,
			textAlign: 'left',
			background: primary
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
		link: {
			textDecoration: 'none',
			color: accent,
			fontWeight: 'bold',
			marginBottom: 12,
			textAlign: 'center',
			padding: '10 em'
		}
}));

function ReimbComponent(props: IReimbProps) {

  const classes = useStyles();

  const [reimbState, setReimbState] = useState([] as Reimb[]);
  const [statusFilter, setStatusFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(0);


  let reimbs: any[] = [];

  const updateStatusFilter = (e: any) => {
	  setStatusFilter(e.target.value)
  }

  const updateTypeFilter = (e: any) => {
	setTypeFilter(e.target.value)
}
  useEffect(() => {

	  async function fetchData() {

		const response = await getReimbs();
		
		  for(let reimb of response) {
			if(props.authUser?.role_id === 2 || reimb.author_id === props.authUser?.user_id){
			  if((reimb.status_id === statusFilter || statusFilter === 0 ) && (reimb.type_id === typeFilter || typeFilter === 0)){
			reimbs.push(	
			<>
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<CardHeader title={'Reimbursement: '+ reimb.id} action={
							<IconButton aria-label="settings">
								<Link to={`/reimbursement/${reimb.id}`} onClick={ async () => {
                                    const response = await getReimbById(reimb.id);
                                    props.setThisReimb(response);
                                    console.log(response);
                                }}>
                                	<MoreVertIcon/>
                                </Link>
							</IconButton> }	
						/>
						<Typography variant="h5" component="h2">
							{'$' + reimb.amount}
						</Typography>
						<Typography className={classes.root} color="textSecondary">
							{reimb.description}
						</Typography>
							<ExpansionPanel className={classes.pos}>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									>
									<Typography className={classes.heading}>Detials</Typography>
								</ExpansionPanelSummary>
									<ExpansionPanelDetails className={classes.pos}>
										<Typography className={classes.pos} color="textSecondary">
											<tr>
											{
												reimb.type_id === 1 ?
												<td>Type: Lodging</td> 
												:
												reimb.type_id === 2 ?
												<td>Type: Travel</td>
												:
												reimb.type_id === 3 ?
												<td>Type: Food</td>
												:
												<td>Type: Other</td>
											}
											</tr>
											<tr>
											{
												reimb.status_id === 1 ?
												<td>Status: Pending</td> 
												:
												reimb.status_id === 2 ?
												<td>Status: Approved</td>
												:
												<td>Status: Denied</td>
											}
											</tr>
											<tr>
												{`Author Id: ${reimb.author_id}`}
											</tr>
											<tr>
												{`Submitted: ${reimb.submitted}`}
											</tr>
										</Typography>
									</ExpansionPanelDetails>
							</ExpansionPanel>
					</CardContent>
				</Card>
			</>
			)
			}}
		}
		setReimbState(reimbs);
	}
	fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[statusFilter, typeFilter]);

	return (
		<>
			<>	  
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<Typography color="textSecondary">
							Filters
							<FormControl className={classes.bullet}>
								<InputLabel htmlFor="age-native-simple">Status</InputLabel>
									<Select value={statusFilter} onChange={updateStatusFilter} defaultValue={0}>
										<option value = {0}></option>
										<option value = {1}>Pending</option>
										<option value = {2}>Approved</option>
										<option value = {3}>Rejected</option>
									</Select>
							</FormControl>
				
							<FormControl className={classes.bullet}>
								<InputLabel htmlFor="age-native-simple">Type</InputLabel>
									<Select value={typeFilter} onChange={updateTypeFilter} defaultValue={0}>
										<option value = {0}></option>
										<option value = {1}>Lodging</option>
										<option value = {2}>Travel</option>
										<option value = {3}>Food</option>
										<option value = {4}>Other</option>
									</Select>
							</FormControl>
						</Typography>
					</CardContent>
				</Card>
			</>

			<>
				{reimbState}
			</>

		</>
	)
}

export default ReimbComponent;