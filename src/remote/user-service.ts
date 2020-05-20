import { remoteClient } from './client';
// import { localClient } from './client';
import { NewUser } from '../models/newUser';
import { User } from '../models/user';

let currentClient = remoteClient;

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
		first_name: newUser.first_name, 
		last_name: newUser.last_name, 
		email: newUser.email, 
		role_id: newUser.role_id
		});
	return await response.data;
}

export const updateUser = async (updatedUser: User) => {

	let response = await currentClient.put('/users', 
		{
		user_id: updatedUser.user_id,
		username: updatedUser.username,
		password: updatedUser.password, 
		first_name: updatedUser.first_name, 
		last_name: updatedUser.last_name, 
		email: updatedUser.email, 
		role_id: updatedUser.role_id
		});
	return await response.data;	
}

export const getUserById = async (user_id: number) => {

	let response = await currentClient.get(`/users/${user_id}`)
	return response.data;
}

export const deleteById = async (user_id: number) => {

	let response = await currentClient.delete(`/users/${user_id}`)
	return response.data;
}