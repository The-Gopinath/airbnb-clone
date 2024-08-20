import axios from "axios";
import { createContext, useEffect, useState } from "react"; 


export const userContext=createContext({});

export function UserContextProvider({children}){
    const [user,setUser]=useState(null);
    const [go,setGo]=useState(false)
    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data)
                setGo(true)
            })
        }
    },[])
    return(
        <userContext.Provider value={{user,setUser,go}}> 
            {children}
        </userContext.Provider>
    )
}

