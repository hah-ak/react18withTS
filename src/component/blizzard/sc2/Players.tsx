import axios from 'axios';
import React from 'react';
import { playerType } from '../BlizzardLogin';

type Props = {
    players:playerType[]
};
type playerProps = {
    player:playerType
}

export const Player = ({player}:playerProps):JSX.Element => {
    
    const onClickImg = async (sendPlayer:playerType):Promise<void> => {
        const response = await axios.post(`/api/blizzard/sc2Profile`,{...sendPlayer})
        console.log(response.data)
    }
    return (
        <div>
            <img src={player.avatarUrl} alt="" width={180} height={180} onClick={()=>onClickImg(player)}/>
        </div>
    )
}

export const Players = ({players}: Props):JSX.Element => {
    return (
        <div>
            {players.map((value:playerType,index:number)=>{
                return <Player player={value} key={index} />
            })}
        </div>
        
    )
    
    
  
};
