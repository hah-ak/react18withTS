import axios from 'axios';
import React, { useState } from 'react';
import { playerType, userDataType } from '../BlizzardLogin';
import { Players } from './Players';

type Props = {
    userInfo:userDataType
};

const Sc2Main = ({userInfo}: Props):JSX.Element => {
    const [players, setPlayers] = useState<playerType[]>();
    const onClickSc2Button = async ():Promise<boolean> => {
        try {
            const getdata = await axios.get(`/api/blizzard/sc2Player?profileId=${userInfo?.id}`)
            setPlayers(getdata.data)
            return true
        } catch (e) {
            return false;
        }
    }
    
  return (
      <>
        <button onClick={onClickSc2Button}>sc2Player</button>
        {players ? <Players players={players}/> : <div></div>}
      </>
    
  )
};

export default React.memo(Sc2Main);
