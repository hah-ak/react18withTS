import axios from 'axios'
import React, { Component, ComponentType, FunctionComponent, lazy, Suspense, useEffect, useState } from 'react'
import { sc2 } from '../../types/Sc2Types'
import CreateUser from '../Test/CreateUser'
import UserTest from '../Test/UserTest'

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
const axiosHeaders = () => {
    return axios.defaults.headers.common["BLIZZARD"];
}
// const otherComponent = React.lazy(() => import('./UserInfo').then(res=> ({default:res.UserInfo})))
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
            useEffect(()=>{
                axios.get("/api/blizzard/blizzardUserInfo").then(res => {console.log(res.data);setUserInfo(res.data)}).catch()
            },[])
            if (userInfo) {
                return (
                    <div>
                        Blizzard Login Success
                        {userInfo.battletag}
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
            {/* <div onClick={()=>blizzardLogin()}>
                Blizzard LogIn
            </div> */}
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