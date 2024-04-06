import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService, fetchUserDataApi } from "../apis/LoginApi";
import { apiClient } from "../apis/apiClient";

export const AuthContext=createContext()
export const useAuth=()=>useContext(AuthContext)

export default function AuthProvider({children}){
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const[username,setUsername]=useState(null)
    const[token,setToken]=useState(null)
    const [roles,setRoles]=useState([])

    async function login(username,password){
        const baToken='Basic '+window.btoa(username +":" + password)
        try{
            const response=await executeBasicAuthenticationService(baToken)
            if(response.status===200){
                setIsAuthenticated(true)
                setUsername(username)
                setToken(baToken)
               
                apiClient.interceptors.request.use(
                    (config)=>{
                        console.log('intercepting and adding a token')
                        config.headers.Authorization=baToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
            }catch(error){
                logout()
                return false;
            }
        }
        function logout(){
            setIsAuthenticated(false)
            setToken(null)
            setUsername(null)
        }
        return (
            <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token}  }>
                {children}
            </AuthContext.Provider>
        )
    }

  
   
    
