import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    battleTag:string | undefined
};
interface endorsementNodeType {
    value:number,
    rate:number
}

interface OWPlayerType {
    username:string,
    level:number,
    portrait:string,
    endorsement:{
        sportsmanship:endorsementNodeType,
        shotcaller:endorsementNodeType,
        teammate:endorsementNodeType,
        level:number,
        frame:string,
        icon:string
    },
    private:boolean,
    games:{
        quickplay:{won:number},
        competitive:{
            won:number,lost:number,draw:number,played:number,win_rate:object
        }
    },
    playtime:{
        quickplay:string,
        competitive:string
    },
    competitive:{
        rank:object,
        rank_img:object
    },
    levelFrame:string,
    star:string
}

const platForm = {
    pc:"pc",
    xbl:"xbl",
    psn:"psn"
}

const region = {
    us:"us",
    eu:"eu",
    kr:"kr",
    cn:"cn",
    global:"global"
}

const OverWatchPlayer = (props: Props) => {

    const [OWplayer,setOWplayer] = useState();
    const regionRef = useRef<HTMLSelectElement>();
    const platformRef = useRef<HTMLSelectElement>();
    const battleTagRef = useRef<HTMLInputElement>();

    const getPlayer = async ():Promise<any> => {
        try {
            const getData = await axios.get(`https://best-overwatch-api.herokuapp.com/player/${platformRef.current?.value}/${regionRef.current?.value}/${battleTagRef.current?.value}`)
            setOWplayer(getData.data)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <input type="text" placeholder='battleTag' defaultValue={props.battleTag} ref={(el:HTMLInputElement) => battleTagRef.current = el}/>
            <label htmlFor={regionRef.current?.accessKeyLabel}>region설정</label>
            <select name='region' ref={(el:HTMLSelectElement) => regionRef.current=el }>
                {Object.entries(region).map(([key,value],index)=> {
                    return <option value={value} defaultChecked={index==0? true:false}>{key}</option>
                })}    
            </select>
            <label htmlFor={platformRef.current?.accessKeyLabel}>platform설정</label>
            <select name='region' ref={(el:HTMLSelectElement)=> platformRef.current = el}>
                {Object.entries(region).map(([key,value],index)=> {
                    return <option value={value} defaultChecked={index == 0? true:false}>{key}</option>
                })}    
            </select>
            <button onClick={getPlayer}>getOwPlayer</button>
        </div>
    ) 
};

export default OverWatchPlayer;
