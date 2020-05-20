import { remoteClient } from './client';
import { User } from '../models/user';

export async function authenticate(username: string, password: string): Promise<User> {
    let response = await remoteClient.post('/auth', {username, password});
    return await response.data;
}

// import { localClient } from './client';

// export async function authenticate(username: string, password: string): Promise<User> {
//     let response = await localClient.post('/auth', {username, password});
//     return await response.data;
// }