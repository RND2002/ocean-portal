import { apiClient } from './apiClient';

export const executeBasicAuthenticationService
    = (token) => apiClient.get(`auth/basicauth`
    ,{
        headers: {
            Authorization: token
        }
    }
    )

    // export const getLecturesApi=(token,sectionId)=>{
    //     return apiClient.get(`/sections/${sectionId}/lectures`,{
    //       headers:{
    //         Authorization:`Bearer ${token}`
    //       },
    //     });
    //   } 


    export const fetchUserDataApi=(token,email)=>{
        return apiClient.get(`users/get/${email}`,{
        headers:{
          Authorization:`Bearer ${token}`
        },

    });

}

export const makeUserAuthor=(token,email,authorObject)=>{
    return apiClient.put(`users/update/${email}`,authorObject,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

    export const sendUserRegistrationData = (userData) => {
        return apiClient.post(`users/register`, userData);
      };