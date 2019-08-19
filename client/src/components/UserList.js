import React from 'react';

const UserList = (props) => {

  return (
    <div>
      {props.users.map(item => <div key={item.id}>item.username</div>)}
    </div>
  )
}

export default UserList;