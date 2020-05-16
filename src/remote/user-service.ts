import { userClient } from './client';
import { User } from '../models/user';

export const getUsers = async () => {

	let users = await userClient.get('/users');
	console.log(users.data);
	
}

export const logOut = async () => {
	await userClient.get('/auth');
}

export async function registerUser(newUser: User) {

	let response = await userClient.post('/users', {newUser});
		console.log(response.data);
	return await response.data;
}