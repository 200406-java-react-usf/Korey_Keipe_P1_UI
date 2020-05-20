  
import axios from 'axios';

export const remoteClient = axios.create({
    baseURL: 'http://KhkProject1Api-env.eba-pamzru3a.us-east-1.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const localClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});