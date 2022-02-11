
import axios, { AxiosPromise } from 'axios';
import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, RouteMatch, RouteObject, Router, RouterProps, Routes, useRoutes } from 'react-router-dom';
import { GetCode } from './component/blizzard/oauth/GetCode';
import BlizzardLogin from './component/blizzard/BlizzardLogin';

interface Props {
    
}

const AccessTokenContext = React.createContext("accessToken")
const accessCheck = async ():Promise<void> => {
    const getdata = await axios.get("/api/accessCheck/check")
}
const Routers = () => {
    const mainRoute:RouteObject = { path: "/*",element: <BlizzardLogin /> }
    const getCodeRoute = { path: "/getCode", children:[{path:':code'}],element: <GetCode redirectOBJ={mainRoute}/> }
    const routers = useRoutes([
      mainRoute,
      getCodeRoute,
    ]);
    return routers;
}

export const App:React.FC = (props: Props):JSX.Element => {
    accessCheck()
    return (
        <Routers/>
    )
}
