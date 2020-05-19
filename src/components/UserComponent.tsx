import React, { useEffect, useState } from 'react';
import { User } from '../models/user';
import { getUsers, getUserById } from '../remote/user-service';
import { Card, CardContent, Typography, makeStyles, CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

interface IUserProps{
    authUser: User;
    setThisUser: ((thisUser: User) => void);
}
const useStyles = makeStyles({
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
      fontSize: 24,
    },
    pos: {
      marginBottom: 12,
    },
    id: {
        textAlign: 'left'
    }
  });

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
                                <Link to={`/users/${user.user_id}`} onClick={ async () => {
                                    const response = await getUserById(user.user_id);
                                    props.setThisUser(response); 
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
                            
                            <Typography className={classes.pos} color="textSecondary">
                                {'Username: ' + user.username}
                                <br/>
                                {'Email: ' + user.email}
                            </Typography>
                            <Typography variant="body2" component="p">
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