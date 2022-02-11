import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { pageActionType, pageReducerActionType, pageStateType } from './BlizzardLogin';

type Props = {
    stateList:[pageStateType,pageActionType][]
    onPageClick:React.Dispatch<pageReducerActionType>
};

const PageChooseButton = (props: Props):JSX.Element => {
    return (
        <>
            {props.stateList.map(([state,action]:[pageStateType,pageActionType],index:number)=>{
                return (
                 
                    <span key={index} onClick={()=>props.onPageClick({
                            type:action,
                            page:state
                        })}>
                        {state}Page
                    </span>
                )
                })
            }
        </>
        
    )
}

export default React.memo(PageChooseButton);
