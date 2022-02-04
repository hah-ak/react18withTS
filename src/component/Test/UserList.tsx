import React, { useCallback, useEffect, useRef, useState } from 'react';
import { onClickDivType, updateUserType, userType } from './UserTest';

type Props = {
    users:userType[],
    onRemove:Function,
    onUpdateUser: updateUserType,
    onClickDiv:onClickDivType
};
interface userDivProps {
    onRemove:Function,
    onUpdateUser: updateUserType,
    onClickDiv:onClickDivType,
    value:userType,
    index:number,
};
interface onClickUpdateType{
    (index:number):void
}
const UserDiv = React.memo(({value,index,onRemove,onClickDiv,onUpdateUser}:userDivProps)=> {
    console.log("bbbb")
    const isUpdate = useRef<boolean>(false)
    const inputUserNameRef = useRef<HTMLInputElement>(null)
    const inputEmailRef = useRef<HTMLInputElement>(null)

    const onClickUpdate:onClickUpdateType = useCallback(
        (index:number) => {
            const emailCurrent = inputEmailRef.current
            const userNameCurrent = inputUserNameRef.current
            if (emailCurrent != null && userNameCurrent != null) {
                const { current } = isUpdate
                if (current) {
                    const user = value
                    onUpdateUser({...user,email:emailCurrent.value,username:userNameCurrent.value})
                    emailCurrent.readOnly = true;
                    userNameCurrent.readOnly = true;
                    
                } else {
        
                    emailCurrent.readOnly = false;
                    userNameCurrent.readOnly = false;
                }
                isUpdate.current = !current
            }
            
        },[]
    )
   
    return (
        <div onClick={()=>onClickDiv(value)} style={{border: value.active ?"1px solid black" : ""}}>
                <input readOnly={true} defaultValue={value.username} ref={inputUserNameRef}/>
                &nbsp;<input readOnly={true} defaultValue={value.email} ref={inputEmailRef}/>
                <button onClick={()=>onRemove(value.id)}>삭제</button>
                <button onClick={()=>onClickUpdate(index)}>{isUpdate.current ? "update" : "update?"}</button>
        </div>
    )
}) 
const UserList = ({users, onRemove, onUpdateUser, onClickDiv}: Props) => {
    // const [isUpdate, setIsUpdate] = useState<boolean[]>(new Array(users.length).fill(false))

    const divRef = useRef<HTMLDivElement[]>([])
    // const inputUserNameRef = useRef<HTMLInputElement[]>([])
    // const inputEmailRef = useRef<HTMLInputElement[]>([])
    // const onClickUpdate:onClickUpdateType = useCallback(
    //     (index:number) => {
    //         setIsUpdate(isUpdate => {
    //             const isUpdateList = isUpdate
    //             if (isUpdateList[index]) {
    //                 const user = users[index]
    //                 onUpdateUser({...user,email:inputEmailRef.current[index].value,username:inputUserNameRef.current[index].value})
                    
    //                 isUpdateList[index] = false
        
    //                 inputEmailRef.current[index].readOnly = true;
    //                 inputUserNameRef.current[index].readOnly = true;
                    
    //             } else {
                    
    //                 isUpdateList[index] = true
        
    //                 inputEmailRef.current[index].readOnly = false;
    //                 inputUserNameRef.current[index].readOnly = false;
    //             }
    //             return [...isUpdateList]
    //         })
    //     },[users]
    // )

  return (
    <div>
        {users.map<JSX.Element>((value,index):JSX.Element =>{
            return (
                <UserDiv 
                key={index}
                onRemove={onRemove}
                onUpdateUser={onUpdateUser}
                onClickDiv={onClickDiv}
                value={value}
                index={index}
                />
            )
        })}  
    </div>
  )
};

export default React.memo(UserList)
