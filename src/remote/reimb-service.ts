import { remoteClient } from './client';
import { localClient } from './client';
import { NewReimb } from '../models/newReimb';

let currentClient = localClient;

export const getReimbs = async () => {

	let response = await currentClient.get('/reimbursements');
	return response.data;
}

export const createReimb = async (newReimb: NewReimb) => {

	let response = await currentClient.post('/reimbursements', 
	{
		amount: newReimb.amount,
		description: newReimb.description,
		author_id: newReimb.author_id,
		type_id: newReimb.type_id
	});
	return response.data;
}

