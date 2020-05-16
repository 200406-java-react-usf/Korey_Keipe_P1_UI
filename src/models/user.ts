export class User {
    user_id: number | null;
    username: string;
    password: string;
    firstName: string;
	lastName: string;
	email: string;
	role_id: number;

    constructor(id: number | null, un: string, pw: string, fn: string, ln: string, email: string, role_id: number) {
        this.user_id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
		this.lastName = ln;
		this.email = email;
		this.role_id = role_id;
    }
}