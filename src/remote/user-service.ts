import { userClient } from './client';

export const getUsers = async () => {

	let users = await userClient.get('/users');
	console.log(users.data);
	
}