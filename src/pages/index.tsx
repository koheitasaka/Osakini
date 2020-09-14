import React from 'react';
import Layout from '../components/Layout';
import UserPage from '../components/UserPage';
import { auth, functions } from '../config';

const IndexPage = () => {
  const [name, setName] = React.useState('');
  const [position, setPositon] = React.useState('');
  const [team, setTeam] = React.useState('');
  const [isUpdating, setIsUpdating] = React.useState(false);

  const fetchUser = async () => {
    const fetchUser = functions.httpsCallable('fetchUser');
    const result = await fetchUser(auth.currentUser?.uid as string);
    return result.data;
  };

  const updateUser = async () => {
    setIsUpdating(true);
    const result = await fetchUser();
    setName(result.name);
    setPositon(result.position);
    setTeam(result.team);
    setIsUpdating(false);
  };

  React.useEffect(() => {
    let unmounted = false;

    (async () => {
      const result = await fetchUser();

      if (!unmounted) {
        setName(result.name);
        setPositon(result.position);
        setTeam(result.team);
      }
    })();

    return () => {
      unmounted = true;
    };
  });

  return (
    <Layout>
      <UserPage
        userName={name}
        position={position}
        team={team}
        updateUser={updateUser}
        isUpdating={isUpdating}
      />
    </Layout>
  );
};

export default IndexPage;
