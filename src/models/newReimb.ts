export class NewReimb{

	amount: number;
	description: string;
	author_id: number | null;
	type_id: number;

	constructor(amt: number, desc: string, author_id: number | null, type_id: number){

		this.amount = amt;
		this.description = desc;
		this.author_id = author_id;
		this.type_id = type_id;
	}
}