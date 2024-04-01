import { apiClient } from './apiClient';

export const executeBasicAuthenticationService
    = (token) => apiClient.get(`auth/basicauth`
    ,{
        headers: {
            Authorization: token
        }
    }
    )

    export const sendUserRegistrationData = (userData) => {
        return apiClient.post(`users/register`, userData);
      };