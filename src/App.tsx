import axios, { AxiosResponse } from 'axios';
import React, { Suspense, useEffect, useState } from 'react'
import Sc2 from './component/Sc2';
import { UserInfo } from './component/UserInfo';
import { sc2 } from './types/Sc2Types';

interface Props {
    
}

export const App = (props: Props) => {
    const [sc2data, setsc2] = useState<sc2>()
    const [userInfo, setUserInfo] = useState();
    
    const getSc2 = async ():Promise<any[]> => {
        try {
            // const {data} = await axios.get<sc2,AxiosResponse<sc2,String>,String>("/blizzard/sc2")
            // const {data} = await axios.get("/blizzard/sc2UserInfo")
            // axios.get<sc2,AxiosResponse<sc2,String>,String>("/blizzard/sc3"),
            const datas = await axios.all([axios.get("/blizzard/getAuthURL")])
            // setsc2(data)
            // setUserInfo(userData)
            // return Promise.resolve(data)
            return Promise.resolve(datas)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const NODE_ENV = ():void => {
        console.log(process.env.NODE_ENV);
    }
    const getSc2Data = async () => {
        const returnValue = await getSc2()
        returnValue.map((value:sc2|any,index)=>{
            value.data._links ? setsc2(value.data) : setUserInfo(value.data);
        })
    }
    return (
        <div>
            {/* {NODE_ENV()} */}
            <div onClick={()=>getSc2Data()}>
                getSc2Data
            </div>

            <Sc2 sc2={sc2data}></Sc2>
            <UserInfo userInfo={userInfo!}></UserInfo>
            
        </div>
    )
}
