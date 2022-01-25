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
    const getToken = async (params:URLSearchParams) => {
        const get = await axios.get(`/api/blizzard/setToken?code=${code}`)
        return get;
    }

    getToken(code).then(res=>{
        console.log(res.data)
        navigate(-1)
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
