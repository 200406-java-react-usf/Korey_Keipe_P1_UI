import React, { useEffect, useState } from 'react';
import { User } from '../models/user';
import { getUsers } from '../remote/user-service';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

interface IUserProps{
    authUser: User;
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