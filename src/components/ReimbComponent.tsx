import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Reimb } from '../models/reimb';
import { getReimbs, getReimbById } from '../remote/reimb-service';
import { IconButton, CardHeader, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { User } from '../models/user';
import { Link } from 'react-router-dom';

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
			alignItems: 'center'
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
			textAlign: 'left'
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
			color: 'white',
			marginBottom: 12,
			textAlign: 'center',
			padding: '10 em'
		}
}));

function ReimbComponent(props: IReimbProps) {

  const classes = useStyles();

  const [reimbState, setReimbState] = useState([] as Reimb[]);

  let reimbs: any[] = [];

  useEffect(() => {
	  async function fetchData() {

		const response = await getReimbs();
			  
		  for(let reimb of response) {
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
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									>
									<Typography className={classes.heading}>Detials</Typography>
								</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<Typography className={classes.pos} color="textSecondary">
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
		}
		setReimbState(reimbs);
	}
	fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

	return (
		<>
			{reimbState}
		</>
	)
}

export default ReimbComponent;