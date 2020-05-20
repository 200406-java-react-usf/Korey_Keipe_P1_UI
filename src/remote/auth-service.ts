import { remoteClient } from './client';
import { User } from '../models/user';
import { localClient } from './client';


export async function authenticate(username: string, password: string): Promise<User> {
    let response = await localClient.post('/auth', {username, password});
    return await response.data;
}

