import axios, { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import { userDataType } from '../BlizzardLogin';
import OverWatchProfile from './OverWatchProfile';

type Props = {
    userInfo?:userDataType
};
interface stats {
    eliminationAvg:number,
    damageDoneAvg:number,
    deathsAve:number,
    finalBlowsAvg:number,
    healingDoneAve:number,
    objectiveKillsAvg:number,
    ObjectiveTimeAvg:string,
    soloKillAvg:number,
    games:{
        played:number,
        won:number
    },
    awards:{
        cards:number,
        medals:number,
        medalsBronze:number,
        medalsSilver:number,
        medalsGold:number
    }
}
interface OWPlayerType {
    endorsement:number,
    endorsementIcon:string,
    icon:string,
    name:string,
    level:number,
    levelIcon:string,
    prestige:number,
    prestigeIcon:string,
    rating:string,
    ratingIcon:string,
    gamesWon:number,
    quickPlayStats:stats,
    competitiveStats:stats
}

const platForm = {
    pc:"pc",
    etc:"etc"
}

const region = {
    us:"us",
    eu:"eu",
    asia:"asia"
}

const OverWatchPlayer = (props: Props) => {

    const [OWplayer,setOWplayer] = useState<OWPlayerType>();
    const regionRef = useRef<HTMLSelectElement>();
    const platformRef = useRef<HTMLSelectElement>();
    const battleTagRef = useRef<HTMLInputElement>();
    
    const getPlayer = async ():Promise<void> => {
        const urlTag = battleTagRef.current?.value.replace("#","-")
        
        try {
            const getData:AxiosResponse<OWPlayerType> = await axios.get(`https://ow-api.com/v1/stats/${platformRef.current?.value}/${regionRef.current?.value}/${urlTag}/profile`,{withCredentials:false})
            if (getData.status === 200) {
                const {data} = await axios.post("/api/blizzard/owPlayer/insert",getData.data)
                setOWplayer(getData.data)
            }
            
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <input type="text" placeholder='battleTag' defaultValue={props.userInfo?.battletag} ref={(el:HTMLInputElement) => battleTagRef.current = el}/>
            <label htmlFor={regionRef.current?.accessKeyLabel}>region설정</label>
            <select name='region' ref={(el:HTMLSelectElement) => regionRef.current=el }>
                {Object.entries(region).map(([key,value],index)=> {
                    return <option value={value} defaultChecked={index==0? true:false} key={index}>{key}</option>
                })}    
            </select>
            <label htmlFor={platformRef.current?.accessKeyLabel}>platform설정</label>
            <select name='platform' ref={(el:HTMLSelectElement)=> platformRef.current = el}>
                {Object.entries(platForm).map(([key,value],index)=> {
                    return <option value={value} defaultChecked={index == 0? true:false} key={index}>{key}</option>
                })}    
            </select>
            <button onClick={getPlayer}>getOwPlayer</button>
            {OWplayer ? <OverWatchProfile profileData={OWplayer}/> :<span>데이터가 없어영</span>}
        </div>
    ) 
};

export default React.memo(OverWatchPlayer);
export {OWPlayerType,stats}
