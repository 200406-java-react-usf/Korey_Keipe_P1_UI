export class NewReimb{

	amount: number;
	description: string;
	type_id: number;

	constructor(amt: number, desc: string, type: number){

		this.amount = amt;
		this.description = desc;
		this.type_id = type;
	}
}