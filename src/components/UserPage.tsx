import React from 'react';
import Link from 'next/link';
import { auth, functions } from '../config';
import Layout from './Layout';

interface IProps {
  userName?: string;
  position: string;
  team: string;
}

const UserPage: React.FC<IProps> = ({ userName, position, team }) => {
  const handleLogout = async () => {
    try {
      const fetchUser = functions.httpsCallable('fetchUser');
      const result = await fetchUser(auth.currentUser?.uid as string);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    await auth.signOut();
  };

  return (
    <div>
      <h1>Hello {userName} 👋</h1>
      <p>position: {position}</p>
      <p>team: {team}</p>
      <p>
        <button onClick={() => handleLogout()}>Logout</button>
      </p>
    </div>
  );
};

export default UserPage;
