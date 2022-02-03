import React, { ChangeEvent, EventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';


type Props = {};

const UserTest = (props: Props) => {
    console.log("aaaa")
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
      });
      const { username, email } = inputs;
      const onChange = useCallback(
          (e:React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputs({
                ...inputs,
                [name]: value
            });
        },[inputs])

    const [users,setUsers] = useState<userType[]>([
        {
          id: 1,
          username: 'velopert',
          email: 'public.velopert@gmail.com',
          active:false
        },
        {
          id: 2,
          username: 'tester',
          email: 'tester@example.com',
          active:true
        },
        {
          id: 3,
          username: 'liz',
          email: 'liz@example.com',
          active:false
        }
      ]);
    
    const nextId = useRef(4);
    const onCreate = useCallback(
        () => {
            const user = {
                id: nextId.current,
                username,
                email,
                active:true
            }
            setUsers([...users,user])
    
            setInputs({
                username:'',
                email:''
            })
            nextId.current += 1;
        
        },[users, username, email]
    )

    const onRemove = useCallback(
        (key:number) => {
            setUsers(users.filter(user => user.id !== key))
        },[users]
    )

    const onUpdateUser:updateUserType = useCallback(
        (user) => {
            const usersList = users
            usersList[user.id-1] = {...usersList[user.id - 1], ...user}
            setUsers([...usersList])
        },[users]
    )

    const onClickDiv:onClickDivType = useCallback(
        (user) => {
            const usersList = users
            users[user.id - 1] = {...user, active:user.active ? false: true}
            setUsers([...usersList])
        },[users]
    )
    const conutFunc = ():number =>{
        console.log("tlfgod")
        return users.filter(a=>a.active).length 
    }
    const countActive = useMemo<number>(()=>conutFunc(),[users])
    return (
    <>
        <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} 
        />
        <UserList users={users} onRemove={onRemove} onUpdateUser={onUpdateUser} onClickDiv={onClickDiv}/>
        <div>active True : {countActive}</div>
    </>
    );
};

export default UserTest;

interface userType{
    id:number,
    email:string,
    username:string,
    active:Boolean
}

interface updateUserType{
    (user:userType):void
}

interface onClickDivType {
    (user:userType):void
}

export {updateUserType,userType, onClickDivType}


