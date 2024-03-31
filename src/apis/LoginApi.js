import { apiClient } from './apiClient';

export const executeBasicAuthenticationService
    = (token) => apiClient.get(`auth/basicauth`
    ,{
        headers: {
            Authorization: token
        }
    }
    )