import { remoteClient } from './client';
// import { localClient } from './client';
import { NewReimb } from '../models/newReimb';
import { Reimb } from '../models/reimb';

let currentClient = remoteClient;

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

export const getReimbById = async (id: number) => {

	let response = await currentClient.get(`/reimbursements/${id}`)
	return response.data;
}

export const updateReimb = async (updatedReimb: Reimb) => {
	
	let response = await currentClient.put('/reimbursements', 
	{
		id: updatedReimb.id,
		amount: updatedReimb.amount,
		submitted: updatedReimb.submitted,
		resolved: updatedReimb.resolved,
		description: updatedReimb.description,
		author_id: updatedReimb.author_id,
		resolver_id: updatedReimb.resolver_id,
		status_id: updatedReimb.status_id,
		type_id: updatedReimb.type_id
	});
	return response.data;
}

