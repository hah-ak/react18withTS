import axios from 'axios'
import QueryString from 'qs'
import React, { Reducer, useEffect, useReducer, useState } from 'react'
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
type overwatchPage = "overwatch"
type sc2Page = "sc2"

type pageStateType = overwatchPage | sc2Page
interface pageReducerStateType {
    page: pageStateType,
    pageElement:(params:any)=>JSX.Element
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
            state.pageElement = (userInfo:userDataType):JSX.Element=><OverWatchPlayer userInfo={userInfo}/>
            return {
                ...state
            }
        case "SC2_PAGE":
            state.page = action.page
            state.pageElement = (userInfo:userDataType):JSX.Element=><Sc2Main userInfo={userInfo}/>
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
    pageElement:(userInfo:userDataType):JSX.Element => <Sc2Main userInfo={userInfo}/>
}
const stateList:[pageStateType, pageActionType][] = [['overwatch','OVERWATCH_PAGE'],['sc2','SC2_PAGE']]

const BlizzardLogin = (props: Props) => {
   
    const [userInfo, setUserInfo] = useState<userDataType>();
    const [BLIZZARD, setBLIZZARD] = useState(()=>getCookie("ACCESS_TOKEN"))

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

    return (
        <>
                {BLIZZARD && userInfo 
                    ?   <div>
                            Blizzard Login Success
                            <UserInfo userData={userInfo}/>
                            <PageChooseButton stateList={stateList} onPageClick={dispatch}/>
                            {page.pageElement(userInfo)}
                        </div>
                    : BLIZZARD 
                    ?<FallBackHtml />
                    :<>    
                    <div onClick={()=>blizzardLogin()}>
                        Blizzard LogIn
                    </div>
                    <UserTest/>
                    </>}
        </>
    )
}

export default React.memo(BlizzardLogin)
export {userDataType,playerType,pageStateType,pageReducerActionType,pageActionType}