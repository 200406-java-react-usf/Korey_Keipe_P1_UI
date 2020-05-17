import React, { useEffect, useState } from 'react';
import { User } from '../models/user';
import { getUsers } from '../remote/user-service';

interface IUserProps{
    authUser: User;
}

const UserComponent = (props: IUserProps) => {
    
    const [usersState, setUsersState] = useState([] as User[]);

    let users: any[] = [];

    useEffect(() => {
		async function fetchData() {

			const response = await getUsers();
				
			for(let user of response) {
				users.push(
					<tr>
                        <td>{user.user_id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>

                        {
                        user.role_id === 1 ?
                            <td>Admin</td> 
                            :
                        user.role_id === 2 ?
                            <td>Financial Manager</td>
                            :
                            <td>User</td>
                        }
                    </tr>
				)
			}
			setUsersState(users);
		}
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

    return (
		!props.authUser || (props.authUser.role_id !== 1) ?
        
        <>
            <h1>Youre not authorized to view this page</h1>
        </>
        :
        <>
            <h1>User Component</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {usersState}
                </tbody>
            </table>
        </>
    );
}

export default UserComponent;