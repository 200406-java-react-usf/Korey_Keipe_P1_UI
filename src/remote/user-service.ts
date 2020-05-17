import { userClient } from './client';
import { localClient } from './client';
import { NewUser } from '../models/newUser';

export const getUsers = async () => {

	let users = await localClient.get('/users');
	return users.data;	
}

export const logOut = async () => {
	await userClient.get('/auth');
}

export async function registerUser(newUser: NewUser) {
	
	let response = await userClient.post('/users', 
		{username: newUser.username,
		password: newUser.password, 
		firstName: newUser.firstName, 
		lastName: newUser.lastName, 
		email: newUser.email, 
		role_id: newUser.role_id
		});
	return await response.data;
}