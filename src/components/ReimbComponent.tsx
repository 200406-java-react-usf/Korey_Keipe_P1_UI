import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Reimb } from '../models/reimb';
import { getReimbs } from '../remote/reimb-service';
import { IconButton, Collapse, CardHeader } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { User } from '../models/user';

interface IReimbProps {
	authUser: User;
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
		}
}));

function ReimbComponent(props: IReimbProps) {

  const classes = useStyles();

  const [reimbState, setReimbState] = useState([] as Reimb[]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let reimbs: any[] = [];

  useEffect(() => {
	  async function fetchData() {

		  const response = await getReimbs();
			  
		  for(let reimb of response) {
			  reimbs.push(
			<>	  
				{ reimb.author_id === props.authUser?.user_id ? 	
				<>
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<CardHeader title={'Reimbursement: '+ reimb.id} subheader={reimb.submitted} action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton> }	
						/>
						<Typography variant="h5" component="h2">
							{'$' + reimb.amount}
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							{reimb.description}
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							<td>
							{
								reimb.status_id === 1 ?
								<td>Status: Pending</td> 
								:
								reimb.status_id === 2 ?
								<td>Status: Approved</td>
								:
								<td>Status: Denied</td>
                            }
							</td>
							<td>
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
							</td>
						</Typography>

							<CardActions>
								<IconButton
									className={clsx(classes.expand, {
										[classes.expandOpen]: expanded,
									})}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show details"
									>
									<ExpandMoreIcon />
								</IconButton>
							</CardActions>
						{/* <Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography paragraph>Description:</Typography>
								<Typography paragraph>
									{reimb.description}
								</Typography>
								<Typography paragraph>
								</Typography>
								<Typography paragraph>
									{reimb.auther_id}
								</Typography>
							</CardContent>
						</Collapse> */}
					</CardContent>
				</Card>
				</> 
				: <></> 
				}
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