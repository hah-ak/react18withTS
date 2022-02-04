import React, { ChangeEventHandler, MouseEventHandler } from 'react';

type Props = {
    onChange:ChangeEventHandler<HTMLInputElement>,
    onCreate:MouseEventHandler,
    username:string,
    email:string

};

const CreateUser = ({onChange, onCreate, username, email}:Props) => {
  return <div>
  <input
    name="username"
    placeholder="계정명"
    onChange={onChange}
    value={username}
  />
  <input
    name="email"
    placeholder="이메일"
    onChange={onChange}
    value={email}
  />
  <button onClick={onCreate}>등록</button>
</div>;
};

export default React.memo(CreateUser);

