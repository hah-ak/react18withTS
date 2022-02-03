import React from 'react';
import axios from 'axios';
import { userDataType } from './BlizzardLogin';

const UserInfo = async ():Promise<JSX.Element> => {
    
     
    try {
        const getData:Promise<userDataType> = await axios.get("/api/blizzard/blizzardUserInfo").then(res => res.data)
        return (
            <>
                <div>
                    {getData}
                </div>
            </>
        )
    } catch (e) {
        return (
            <div>
                fail
            </div>
        )
    }
}


export default UserInfo
