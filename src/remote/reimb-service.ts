import { remoteClient } from './client';
import { localClient } from './client';
import { NewReimb } from '../models/newReimb';

let currentClient = localClient;

export const getReimbs = async () => {

	let response = await currentClient.get('/reimbursements');
	return response.data;
}

export const createReimb = async (newReimb: NewReimb) => {

	let response = await currentClient.post('/reimbursement', {
		
		amount: newReimb.amount,
		description: newReimb.description,
		type_id: newReimb.type_id
	});
	return response;
}

