import axios, { Axios } from 'axios'
import QueryString from 'qs'
import React, { Component, ComponentType, FunctionComponent, lazy, Reducer, ReducerAction, ReducerState, Suspense, useEffect, useReducer, useState } from 'react'
import { sc2 } from '../../types/Sc2Types'
import { getCookie } from '../../utils/cookieUtil'
import UserTest from '../Test/UserTest'
import { Players } from './sc2/Players'
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
type overwatchPage = "overwatch"
type sc2Page = "sc2"

type pageStateType = overwatchPage | sc2Page
interface pageReducerStateType {
    page: pageStateType
}

type overwatchPageType = "OVERWATCH_PAGE"
type sc2PageType = "SC2_PAGE"
interface pageReducerActionType {
    type:overwatchPageType|sc2PageType
    page:pageStateType
}


const pageReducer:Reducer<pageReducerStateType,pageReducerActionType> = (state,action) => {
    switch (action.type) {
        case "OVERWATCH_PAGE":
            state.page = action.page
            return {
                ...state
            }
        case "SC2_PAGE":
            state.page = action.page
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
    page:'sc2'
}

// const otherComponent = React.lazy(() => import('./UserInfo').then(res=> ({default:res.UserInfo})))
const BlizzardLogin = (props: Props) => {
    const [sc2data, setsc2] = useState<sc2>()
    const [userInfo, setUserInfo] = useState<userDataType>();
    const [BLIZZARD, setBLIZZARD] = useState(()=>getCookie("ACCESS_TOKEN"))
    const [players, setPlayers] = useState<playerType[]>();

    const [page,dispatch] = useReducer<Reducer<pageReducerStateType,pageReducerActionType>>(pageReducer,reducerInit);

    const getBlizzardToken = async ():Promise<any[]|void> => {
        try {
            const datas = await axios.all([axios.get("/api/blizzard/blizzardLogin")])
            const returnValue = datas[0].data
            // const state = new URLSearchParams(returnValue).get("state")
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

    const onClickSc2Button = async ():Promise<boolean> => {
        try {
            const getdata = await axios.get(`/api/blizzard/sc2Player?profileId=${userInfo?.id}`)
            setPlayers(getdata.data)
            return true
        } catch (e) {
            return false;
        }
        
    }
    
    const viewPage = ():JSX.Element => {
        
        if (BLIZZARD) {
            useEffect(()=>{
                axios.get("/api/blizzard/blizzardUserInfo").then(res => {console.log(res.data);setUserInfo(res.data)}).catch()
            },[])
            if (userInfo) {
                return (
                    <div>
                        Blizzard Login Success
                        <div></div>
                        <UserInfo userData={userInfo}/>
                        <button onClick={onClickSc2Button}>sc2Player</button>
                        {players ? <Players players={players}/> : <div></div>}
                    </div>
                    )
            } else {
                return (
                    <FallBackHtml />
                )
                    
            }
            
        } else {
            return ( 
                <>    
            <div onClick={()=>blizzardLogin()}>
                Blizzard LogIn
            </div>
            <UserTest/>
            </>
            )
        }
    }
    
    return viewPage()
}

export default BlizzardLogin
export {userDataType,playerType}