import axios from 'axios'
import React, { Component, ComponentType, FunctionComponent, lazy, Suspense, useState } from 'react'
import { sc2 } from '../../types/Sc2Types'
import { UserInfo } from './UserInfo'

interface Props {

}
const fallBackHtml = ():JSX.Element => {
    return (
        <>
        <div>
            loadding.....
        </div>
        </>
    )
}
interface userDataType {
    sub:string,
    id:Number,
    battleTag:string
}
const getUserInfo= lazy(() => import('./UserInfo'))
    // const rdata = axios.get("/api/blizzard/blizzardUserInfo")
    // return userData;

const axiosHeaders = () => {
    return axios.defaults.headers.common["BLIZZARD"];
}
const BlizzardLogin = (props: Props) => {
    const [sc2data, setsc2] = useState<sc2>()
    const [userInfo, setUserInfo] = useState<userDataType>();
    const [blizzardHeader, setBlizzardHeader] = useState(()=>axiosHeaders());
    const getBlizzardToken = async ():Promise<any[]> => {
        try {
            const datas = await axios.all([axios.get("/api/blizzard/blizzardLogin")])
            return Promise.resolve(datas)
        } catch (e) {
            return Promise.reject(e)
        }
    }
    
    const blizzardLogin = async () => {
        const returnValue = await getBlizzardToken()
        returnValue.map((value:sc2|any,index)=>{
            window.location.href = value.data
        })
    }
    const viewPage = ():JSX.Element => {
        if (blizzardHeader) {
            getUserInfo(()=>setUserInfo); 
            return (
            <>
            <div>
                Blizzard Login Success
            </div>
            <Suspense fallback={fallBackHtml()}>
                <UserInfo userInfo={userInfo}/>
            </Suspense>
            </>
            
            )
        } else {
            return (     
            <div onClick={()=>blizzardLogin()}>
                Blizzard LogIn
            </div>
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