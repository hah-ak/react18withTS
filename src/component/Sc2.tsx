import React from 'react'
import { sc2 } from '../types/Sc2Types'

interface Props {
    sc2?:sc2 
}

const Sc2 = (props: Props) => {
    
    return (
        <div>
            {props.sc2?.key.season_id}
        </div>
    )
}

export default Sc2
