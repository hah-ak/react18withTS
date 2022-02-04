import React, { ChangeEvent, EventHandler, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';


type Props = {};
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

interface inputType {
    username:string,
    email:string
}
interface reducerType<T,S extends reducerActionBasicType> {
    (state:T,action:S):T
}

interface reducerStateType {
    users:userType[],
    input:inputType
}
interface reducerActionBasicType {
    type:string,
}
type CHANGE_INPUT_ACTION = "CHANGE_INPUT"
interface CHANGE_INPUT_TYPE extends reducerActionBasicType{
    type:CHANGE_INPUT_ACTION,
    name:string,
    value:any,
}
type CREATE_INPUT_ACTION ="CREATE_INPUT"
interface CREATE_INPUT_TYPE extends reducerActionBasicType{
    type: CREATE_INPUT_ACTION,
    user:userType
}
type REMOVE_USER_ACTION = "REMOVE_USER"
interface REMOVE_USER_TYPE extends reducerActionBasicType {
    type:REMOVE_USER_ACTION,
    id:number
}
type UPDATE_USER_ACTION = "UPDATE_USER"
interface UPDATE_USER_TYPE {
    type:UPDATE_USER_ACTION,
    user:userType
}

type reducerActionType = CHANGE_INPUT_TYPE | CREATE_INPUT_TYPE | REMOVE_USER_TYPE | UPDATE_USER_TYPE

const reducer:reducerType<reducerStateType,reducerActionType> = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.name] : action.value
                }
            }
        case "CREATE_INPUT":
            const {username, email} = state.input
            const newUser:userType = {
                active:false,
                email,
                username,
                id:action.user.id
            }
            
            return {
                    input:{
                        ...initialState.input
                    },
                    users:[...state.users, newUser ]
                }
        case "REMOVE_USER":
            const removeId = action.id
            
            return {
                ...state,
                users:[...state.users.filter((value)=> value.id !== removeId )]
            }
        case "UPDATE_USER":
            const userList = state.users
            userList[action.user.id - 1] = {
                ...action.user
            }
            return {
                ...state,
                users:[...userList]
            }
        default :
            return state
    }
}

const initialState:reducerStateType = {
    input:{
        username:"",
        email:""
    },
    users:[
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
        ]
    }

const UserTest = (props: Props) => {
    
    const [state, dispatch] = useReducer(reducer,initialState)
    const { users } = state
    const { username, email } = state.input
    // const [inputs, setInputs] = useState({
    //     username: '',
    //     email: ''
    //   });
    //   const { username, email } = inputs;
    //   const onChange = useCallback(
    //       (e:React.ChangeEvent<HTMLInputElement>) => {
    //         const { name, value } = e.target;
    //         setInputs(inputs=>({
    //             ...inputs,
    //             [name]: value
    //         }));
    //     },[])
    const onChange = useCallback(
        (e:React.ChangeEvent<HTMLInputElement>)=> {
            const { name, value } = e.currentTarget
            const chnageInput:CHANGE_INPUT_TYPE = {
                type:'CHANGE_INPUT',
                name,
                value
            }
            dispatch(chnageInput)
        },[]
    )
    // const [users,setUsers] = useState<userType[]>([
    //     {
    //       id: 1,
    //       username: 'velopert',
    //       email: 'public.velopert@gmail.com',
    //       active:false
    //     },
    //     {
    //       id: 2,
    //       username: 'tester',
    //       email: 'tester@example.com',
    //       active:true
    //     },
    //     {
    //       id: 3,
    //       username: 'liz',
    //       email: 'liz@example.com',
    //       active:false
    //     }
    //   ]);
    
    const nextId = useRef(4);
    // const onCreate = useCallback(
    //     () => {
    //         const user = {
    //             id: nextId.current,
    //             username,
    //             email,
    //             active:true
    //         }
    //         setUsers(users => [...users,user])
    
    //         setInputs({
    //             username:'',
    //             email:''
    //         })
    //         nextId.current += 1;
        
    //     },[username, email]
    // )
    const onCreate = useCallback(
        ()=>{
            const user:userType = {
                id:nextId.current,
                username,
                email,
                active:true
            }
            const createInput:CREATE_INPUT_TYPE = {
                type:'CREATE_INPUT',
                user
            }
            dispatch(createInput)
        },[]
    )
    // const onRemove = useCallback(
    //     (key:number) => {
    //         setUsers(users => users.filter(user => user.id !== key))
    //     },[]
    // )
    const onRemove = useCallback(
        (key:number)=>{
            const removeUser:REMOVE_USER_TYPE = {
                id:key,
                type:'REMOVE_USER'
            }
            dispatch(removeUser)
        },[]
    )
    // const onUpdateUser:updateUserType = useCallback(
    //     (user:userType) => {
    //         setUsers(users => {
    //             const usersList = users
    //             usersList[user.id-1] = {...usersList[user.id - 1], ...user}
    //             return [...usersList]
    //         })
    //     },[]
    // )
    const onUpdateUser:updateUserType = useCallback(
        (user:userType)=>{
            const updateUser:UPDATE_USER_TYPE = {
                type:"UPDATE_USER",
                user
            }
            dispatch(updateUser)
        },[]
    )

    // const onClickDiv:onClickDivType = useCallback(
    //     (user) => {
    //         setUsers(users => {
    //             const usersList = users
    //             users[user.id - 1] = {...user, active:user.active ? false: true}
    //             return [...usersList]
    //         })
    //     },[]
    // )
    const onClickDiv:onClickDivType = useCallback(
        (user:userType) => {
            user.active = !user.active
            const updateUser:UPDATE_USER_TYPE = {
                type:"UPDATE_USER",
                user
            }
            dispatch(updateUser)
        },[]
    )
    const conutFunc = ():number =>{
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

export default React.memo(UserTest);

export {updateUserType,userType, onClickDivType}


