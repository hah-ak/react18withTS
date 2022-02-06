import axios from 'axios';
import QueryString from 'qs';
import React, { Suspense, useState } from 'react'
import { Navigate, Route, RouteObject, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'


interface Props {
    redirectOBJ:RouteObject
}
interface defaultParamsType {
    
}

export const GetCode = (props: Props) => {
    const [code, setCode] = useSearchParams();
    
    const navigate = useNavigate()
    const getToken = async (params:{code:string|null,state:string|null}) => {
        
        const finalResult = {result:""}
        try {
            if (params.code === null || params.state === null) {
                throw new Error("params null")
            }
            const qss = QueryString.parse(location.href)
            const state = qss.state
            console.log(state)

            const localState = localStorage.getItem("state")
            console.log(localState, params.state)
            for (let index = 0; index < params.state.length; index++) {
                if (params.state.charAt(index) !== localState?.charAt(index)) {
                    console.log(params.state.charAt(index),"storage" + localState?.charAt(index))
                }
                
                
            }
            if (params.state !== localState) {
                throw new Error("state error")
            }
            const returnValue = await axios.get(`/api/blizzard/setToken?code=${params.code}`)
            finalResult.result = returnValue.data
            axios.defaults.headers.common['BLIZZARD'] = `${finalResult.result}`
        } catch (e:any) {
            finalResult.result = e
            console.log(e)
        }
        
        return finalResult.result;
    }
    
    getToken({code:code.get("code"),state:code.get("state")}).then(res=>{
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
