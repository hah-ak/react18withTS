
import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, RouteMatch, RouteObject, Router, RouterProps, Routes, useRoutes } from 'react-router-dom';
import { GetCode } from './component/blizzard/oauth/GetCode';
import BlizzardLogin from './component/blizzard/BlizzardLogin';

interface Props {
    
}

const AccessTokenContext = React.createContext("accessToken")
const cookieInContext = ():void => {
    const accessTokenCookie = document.cookie.match("ACCESS_TOKEN")
    const getInput = accessTokenCookie ? accessTokenCookie.input : null
    const getToken = getInput ? getInput.split("=")[1] : ""
    if (getToken !== "") {
        axios.defaults.headers.common["BLIZZARD"] = getToken
    }
}
const Routers = () => {
    const mainRoute:RouteObject = { path: "/",element: <BlizzardLogin /> }
    const getCodeRoute = { path: "/getCode", children:[{path:':code'}],element: <GetCode redirectOBJ={mainRoute}/> }
    const routers = useRoutes([
      mainRoute,
      getCodeRoute,
    ]);
    return routers;
}

export const App:React.FC = (props: Props):JSX.Element => {
    
    return (
        <Routers/>
    )
}
