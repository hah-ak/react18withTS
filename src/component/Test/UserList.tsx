import React, { useRef, useState } from 'react';
import { onClickDivType, updateUserType, userType } from './UserTest';

type Props = {
    users:userType[],
    onRemove:Function,
    onUpdateUser: updateUserType,
    onClickDiv:onClickDivType
};

const UserList = (props: Props) => {
    console.log("bbbb")
    const [isUpdate, setIsUpdate] = useState<boolean[]>(new Array(props.users.length).fill(false))

    const divRef = useRef<HTMLDivElement[]>([])
    const inputUserNameRef = useRef<HTMLInputElement[]>([])
    const inputEmailRef = useRef<HTMLInputElement[]>([])
    const onClickUpdate = (index:number) => {
        const isUpdateList = isUpdate
        if (isUpdateList[index]) {
            const user = props.users[index]
            props.onUpdateUser({...user,email:inputEmailRef.current[index].value,username:inputUserNameRef.current[index].value})
            
            isUpdateList[index] = false

            inputEmailRef.current[index].readOnly = true;
            inputUserNameRef.current[index].readOnly = true;
            
        } else {
            
            isUpdateList[index] = true

            inputEmailRef.current[index].readOnly = false;
            inputUserNameRef.current[index].readOnly = false;
        }
        setIsUpdate([...isUpdateList])
    }

    const onClickDiv = (value:userType) => {
        props.onClickDiv(value)
    }

  return (
    <div>
        {props.users.map<JSX.Element>((value,index):JSX.Element =>
            <div key={index} ref={(el:HTMLDivElement) => divRef.current[index] = el} onClick={()=>onClickDiv(value)} style={{border: value.active ?"1px solid black" : ""}}>
                <input readOnly={true} defaultValue={value.username} ref={(el:HTMLInputElement) => inputUserNameRef.current[index] = el}/>
                &nbsp;<input readOnly={true} defaultValue={value.email} ref={(el:HTMLInputElement) => inputEmailRef.current[index] = el}/>
                <button onClick={()=>props.onRemove(value.id)}>삭제</button>
                <button onClick={()=>onClickUpdate(index)}>{isUpdate[index] ? "update" : "update?"}</button>
            </div>
        )}  
    </div>
  )
  
};

export default UserList
