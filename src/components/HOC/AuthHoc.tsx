import React from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { auth } from '../../config/';
import Layout from '../Layout';
import Form from '../Form';
import UserPage from '../UserPage';

const AuthHoc = (props: { children: React.ReactChildren }) => {
  const [isACtive, setIsActive] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const router = useRouter();

  const checkAuth = async () => {
    setIsFetching(true);
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setIsSignedIn(true);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    });
  };

  const activateUser = () => {
    setIsActive(true);
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return isFetching ? (
    <div>
      <h1>Please wait</h1>
      <h1>Loading now.....</h1>
    </div>
  ) : !isSignedIn ? (
    <Layout>
      <div>
        <button
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
          }}
        >
          Login
        </button>
      </div>
    </Layout>
  ) : (
    <React.Fragment>{props.children}</React.Fragment>
  );
};

export default AuthHoc;
