export class NewUser {

	username: string;
	password: string;
	firstName: string;
    lastName: string;
	email: string;
	role: string;   
    
    constructor(username: string, password: string, firstName: string, lastName: string, email: string, role: string) {
		
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role = role;
    }
}