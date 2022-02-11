import axios from 'axios'
import QueryString from 'qs'
import React, { Reducer, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { BrowserRouterProps, NavigateOptions, NavigateProps, NavigationType, PathRouteProps, RouteObject, RouterProps, Routes, To, useNavigate, useRoutes } from 'react-router-dom'
import { getCookie } from '../../utils/cookieUtil'
import UserTest from '../Test/UserTest'
import OverWatchPlayer from './overWatch/OverWatchPlayer'
import PageChooseButton from './PageChooseButton'
import Sc2Main from './sc2/Sc2Main'
import UserInfo from './UserInfo'

interface Props {

}
export const FallBackHtml = (props:Props):JSX.Element => {
    return (
        <>
        <div>
            loading.....
        </div>
        </>
    )
}
interface userDataType {
    sub:string,
    id:Number,
    battletag:string
}

interface playerType {
    name:string,
    profileUrl:string,
    avatarUrl:string,
    profileId:string,
    regionId:number,
    realmId:number
}

type pageStateType = "overwatch" | "sc2"
interface pageReducerStateType {
    page: pageStateType,
    router:{to:To,options?:NavigateOptions}
}

type overwatchPageType = "OVERWATCH_PAGE"
type sc2PageType = "SC2_PAGE"
type pageActionType=overwatchPageType|sc2PageType
interface pageReducerActionType {
    type:pageActionType
    page:pageStateType
}


const pageReducer:Reducer<pageReducerStateType,pageReducerActionType> = (state,action) => {
    switch (action.type) {
        case "OVERWATCH_PAGE":
            state.page = action.page
            state.router = {...state.router,to:action.page,options:{replace:true}}
            return {
                ...state
            }
        case "SC2_PAGE":
            state.page = action.page
            state.router = {...state.router,to:action.page,options:{replace:true}}
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

const reducerInit:pageReducerStateType = {
    page:'sc2',
    router:{to:'sc2',options:{replace:true}}
}
interface routerParam {
    userInfo:userDataType
}
const stateList:[pageStateType, pageActionType][] = [['overwatch','OVERWATCH_PAGE'],['sc2','SC2_PAGE']]
const Router = ({userInfo}:routerParam) => {
    const ovRouter:RouteObject = {path:'/overwatch',element:<OverWatchPlayer userInfo={userInfo}/>}
    const sc2Router:RouteObject = {path:'/sc2',element:<Sc2Main userInfo={userInfo}/>}
    const routes:RouteObject[] =[ovRouter,sc2Router]
    const routers = useRoutes(routes)
    return routers
}
const BlizzardLogin = (props: Props) => {
    
    const [userInfo, setUserInfo] = useState<userDataType>()
    const [BLIZZARD, setBLIZZARD] = useState(()=>getCookie("ACCESS_TOKEN"))
    const navigate = useNavigate()
    const [page,dispatch] = useReducer<Reducer<pageReducerStateType,pageReducerActionType>>(pageReducer,reducerInit);
    
    const getBlizzardToken = async ():Promise<any[]|void> => {
        try {
            const datas = await axios.all([axios.get("/api/blizzard/blizzardLogin")])
            const returnValue = datas[0].data
       
            const qss = QueryString.parse(returnValue,{ignoreQueryPrefix:true})
            const state = qss.state
            
            if (state && typeof state === 'string') localStorage.setItem("state",state)
            window.location.href=returnValue
        } catch (e) {
            return Promise.reject(e)
        }
    }
    
    const blizzardLogin = () => {
        getBlizzardToken().catch(e=>console.log(e))
    }

    if (BLIZZARD) {
        useEffect(()=>{
            axios.get("/api/blizzard/blizzardUserInfo").then(res => {setUserInfo(res.data)}).catch()
        },[])
    }
    const onPageClick = useCallback((param)=>{
        dispatch(param)
    },[page.page])
    const resultPage = () => {
        if (userInfo) {
            switch(page.page) {
                case "overwatch":
                    return <OverWatchPlayer userInfo={userInfo} />
                case "sc2":
                    return <Sc2Main userInfo={userInfo}/>
                default :
                    return null;
            }
        }
        
    }
    return (
        <>
                {BLIZZARD && userInfo 
                    ?   <div>
                            Blizzard Login Success
                            <UserInfo userData={userInfo}/>
                            <PageChooseButton stateList={stateList} onPageClick={onPageClick}/>
                            {/* <Router userInfo={userInfo}/> */}
                            {resultPage()}
                        </div>
                    : BLIZZARD 
                    ?<FallBackHtml />
                    :<>    
                    <div onClick={()=>blizzardLogin()}>
                        Blizzard LogIn
                    </div>
                    <UserTest/>
                    <OverWatchPlayer userInfo={userInfo} />
                    </>}
        </>
    )
}

export default React.memo(BlizzardLogin)
export {userDataType,playerType,pageStateType,pageReducerActionType,pageActionType}