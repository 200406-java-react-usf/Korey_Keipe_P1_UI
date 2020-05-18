// import { userClient } from './client';
import { User } from '../models/user';

// export async function authenticate(username: string, password: string): Promise<User> {
//     let response = await userClient.post('/auth', {username, password});
//     return await response.data;
// }

import { localClient } from './client';

export async function authenticate(username: string, password: string): Promise<User> {
    let response = await localClient.post('/auth', {username, password});
    return await response.data;
}