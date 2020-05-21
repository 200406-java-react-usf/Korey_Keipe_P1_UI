import React, { useEffect, useState } from 'react';
import { User } from '../models/user';
import { getUsers, getUserById } from '../remote/user-service';
import { Card, CardContent, Typography, makeStyles, CardHeader, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, Theme, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { grey, cyan, teal } from '@material-ui/core/colors';

const primary = grey[500]; // #F44336
const accent = teal[900]; // #E040FB

interface IUserProps{
    authUser: User;
    setThisUser: ((thisUser: User) => void);
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
      background: primary
    },
    title: {
      fontSize: 24,
      color: grey[900]
    },
    pos: {
      marginBottom: 12,
      textAlign: 'left',
      background: primary
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
  }));

const UserComponent = (props: IUserProps) => {
    
    const classes = useStyles();
    
    const [usersState, setUsersState] = useState([] as User[]);
    
    let users: any[] = [];

    useEffect(() => {
		async function fetchData() {

			const response = await getUsers();
				
			for(let user of response) {
				users.push(

                    <Card className={classes.root} variant="outlined">
                        <CardHeader action={
                            <IconButton aria-label="settings" >
                                <Link to={`/user/${user.user_id}`} onClick={ async () => {
                                    const response = await getUserById(user.user_id);
                                    props.setThisUser(response);
                                    console.log(response);
                                }}>
                                    <MoreVertIcon/>
                                </Link>
                            </IconButton>
                        }
                        />
                        <CardContent>       
                            <Typography className={classes.title} variant="h6" color="textPrimary" gutterBottom>
                                {user.first_name} {user.last_name} {'# ' + user.user_id}
                            </Typography>
                            <ExpansionPanel className={classes.pos}>
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Details</Typography>
                                </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {'Username: ' + user.username}
                                                <br/>
                                            {'Email: ' + user.email}
                                                <br/>
                                            {
                                                user.role_id === 1 ?
                                                <td>Role: Admin</td> 
                                                :
                                                user.role_id === 2 ?
                                                <td>Role: Financial Manager</td>
                                                :
                                                <td>Role: User</td>
                                            }
                                        </Typography>
                                    </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CardContent>
                    </Card>
				)
			}
			setUsersState(users);
		}
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

    return (
        <>
            {usersState}
        </>
    );
}

export default UserComponent;