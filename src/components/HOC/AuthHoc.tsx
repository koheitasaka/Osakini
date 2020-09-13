import React from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { auth } from '../../config/';
import Layout from '../Layout';

const AuthHoc = (props: { children: React.ReactNode }) => {
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
        // router.push('/');
      }
    });
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return isFetching ? (
    <div>
      <h1>Sign in....</h1>
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
