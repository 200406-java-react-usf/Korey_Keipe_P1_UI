export class NewUser {

	username: string;
	password: string;
	firstName: string;
    lastName: string;
	email: string;
	role_id: number;   
    
    constructor(username: string, password: string, firstName: string, lastName: string, email: string, role_id: number) {
		
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role_id = role_id;
    }
}