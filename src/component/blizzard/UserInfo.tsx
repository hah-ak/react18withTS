import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { userDataType } from './BlizzardLogin'

interface Props {
    userInfo:userDataType|undefined
}

const reducer = () => {

}
export const UserInfo = (props: Props) => {
    console.log(props.userInfo)
    useEffect(()=>{
    
    },[])
    
    // document.body.insertAdjacentHTML("beforebegin",props.userInfo)
    return (
        <div>
            aaaa
        </div>

        
    )
}
