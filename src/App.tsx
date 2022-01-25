
import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, RouteMatch, RouteObject, Router, RouterProps, Routes, useRoutes } from 'react-router-dom';
import { GetCode } from './component/oauth/GetCode';
import Sc2 from './component/sc2/Sc2';

interface Props {
    
}
const Routers = () => {
    const mainRoute:RouteObject = { path: "/",element: <Sc2 /> }
    const getCodeRoute = { path: "/getCode", element: <GetCode redirectOBJ={mainRoute}/> }
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
