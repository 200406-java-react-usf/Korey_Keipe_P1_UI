  
import axios from 'axios';

export const userClient = axios.create({
    baseURL: 'http://KhkProject1Api-env.eba-pamzru3a.us-east-1.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/json'
    }
});