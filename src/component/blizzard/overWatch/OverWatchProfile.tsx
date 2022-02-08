import React from 'react';
import { OWPlayerType } from './OverWatchPlayer';

type Props = {
    profileData:OWPlayerType
};

const OverWatchProfile = ({profileData}: Props) => {

    const entrieMap = (obj:object):JSX.Element[] => Object.entries(obj).map(([key,value],index):JSX.Element=>{
        console.log(key)
        return (
                <div key={index}><span>{key}</span>&nbsp;<span>{typeof value !== "object" ?  value  : value !== null ? entrieMap(value):""}</span></div>
            )
        })
    
    return (
        <>
            {entrieMap(profileData)}
        </>
    );
};

export default React.memo(OverWatchProfile)
