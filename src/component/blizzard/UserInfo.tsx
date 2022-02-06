import React from 'react';
import axios from 'axios';
import { userDataType } from './BlizzardLogin';

interface Props {
    userData:userDataType
}

const UserInfo = (props:Props):JSX.Element => {
    
     
    try {
        
        return (
            <>
                <div>
                    {props.userData}
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
