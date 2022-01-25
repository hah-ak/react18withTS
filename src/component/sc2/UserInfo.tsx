import React, { useEffect } from 'react'

interface Props {
    userInfo:string
}

export const UserInfo = (props: Props) => {
    useEffect(()=>{
        
        
    },[])
    // document.body.insertAdjacentHTML("beforebegin",props.userInfo)
    return (
        <div>
            <a href={props.userInfo} target={"_blank"}>getcode</a>
        </div>
    )
}
