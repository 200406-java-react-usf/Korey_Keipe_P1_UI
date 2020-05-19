import { remoteClient } from './client';
import { localClient } from './client';
import { NewUser } from '../models/newUser';

let currentClient = localClient;

export const getUsers = async () => {

	let users = await currentClient.get('/users');
	return users.data;	
}

export const logOut = async () => {
	await currentClient.get('/auth');
}

export async function registerUser(newUser: NewUser) {
	
	let response = await currentClient.post('/users', 
		{username: newUser.username,
		password: newUser.password, 
		firstName: newUser.firstName, 
		lastName: newUser.lastName, 
		email: newUser.email, 
		role_id: newUser.role_id
		});
	return await response.data;
}

export const updateUser = async (updatedUser: NewUser) => {

	let response = await currentClient.put('/users', 
		{username: updatedUser.username,
		password: updatedUser.password, 
		firstName: updatedUser.firstName, 
		lastName: updatedUser.lastName, 
		email: updatedUser.email, 
		role_id: updatedUser.role_id
		});
	return await response.data;	
}

export const getUserById = async (user_id: number) => {

	let response = await currentClient.get(`/users/${user_id}`)
	return response.data;
}