import axios from 'axios';
import React, { Suspense, useState } from 'react'
import { Navigate, Route, RouteObject, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { URLSearchParams } from 'url';


interface Props {
    redirectOBJ:RouteObject
}


export const GetCode = (props: Props) => {
    const [code, setCode] = useSearchParams();
    
    const navigate = useNavigate()
    const getToken = async (params:string|null) => {
        const finalResult = {result:""}
        try {
            if (params === null) {
                throw "params null"
            }
            const returnValue = await axios.get(`/api/blizzard/setToken?code=${params}`,{withCredentials:true})
            finalResult.result = returnValue.data
            axios.defaults.headers.common['BLIZZARD'] = `${finalResult.result}`
        } catch (e:any) {
            finalResult.result = e
        }
        
        return finalResult.result;
    }

    getToken(code.get("code")).then(res=>{
        navigate("/");
    })

    const loadTemplate = () =>{
        return (
            <div>
                Loading.....
            </div>
        )
    }

    return (
        <>
         {loadTemplate()}
        </>
        
    )
}
