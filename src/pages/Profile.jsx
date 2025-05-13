import React from 'react'
import { useAppSelector } from '../redux/hooks';
import { useCurrentToken } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

const Profile = () => {
    const token = useAppSelector(useCurrentToken)
    let user;
    if(token){
        user = verifyToken(token)
    }
  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  )
}

export default Profile

