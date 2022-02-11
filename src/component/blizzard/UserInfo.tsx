import React from 'react';
import axios from 'axios';
import { userDataType } from './BlizzardLogin';

interface Props {
    userData:userDataType
}

const UserInfo = (props:Props):JSX.Element => {
    
    return (
    <>
            <div>
                battletag:{props.userData.battletag}<br/>
                id:{props.userData.id}<br/>
                sub:{props.userData.sub}
            </div>
        </>
    )
}


export default React.memo(UserInfo)
