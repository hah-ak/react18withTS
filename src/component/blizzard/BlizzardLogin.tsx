import axios from 'axios'
import QueryString from 'qs'
import React, { Component, ComponentType, FunctionComponent, lazy, Suspense, useEffect, useState } from 'react'
import { sc2 } from '../../types/Sc2Types'
import { getCookie } from '../../utils/cookieUtil'
import UserTest from '../Test/UserTest'
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

// const otherComponent = React.lazy(() => import('./UserInfo').then(res=> ({default:res.UserInfo})))
const BlizzardLogin = (props: Props) => {
    const [sc2data, setsc2] = useState<sc2>()
    const [userInfo, setUserInfo] = useState<userDataType>();
    const [BLIZZARD, setBLIZZARD] = useState(()=>getCookie("ACCESS_TOKEN"))
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
    const viewPage = ():JSX.Element => {
        
        if (BLIZZARD) {
            useEffect(()=>{
                axios.get("/api/blizzard/blizzardUserInfo").then(res => {console.log(res.data);setUserInfo(res.data)}).catch()
            },[])
            if (userInfo) {
                return (
                    <div>
                        Blizzard Login Success
                        <UserInfo userData={userInfo}/>
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
    
    return (
        <>
            {viewPage()}
        </>
        
    )
}

export default BlizzardLogin
export {userDataType}