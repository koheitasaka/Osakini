import React from 'react';
import firebase from 'firebase';
import { auth, functions } from '../../config/';
import Layout from '../Layout';

const AuthHoc = (props: { children: React.ReactChildren }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const checkAuth = async () => {
    const redirectResult = await auth.getRedirectResult();
    console.log(redirectResult);
    if (redirectResult.user) {
      if (redirectResult.additionalUserInfo?.isNewUser) {
        const createUser = functions.httpsCallable('insertUser');
        await createUser({
          name: auth.currentUser?.uid as string,
          position: 'Undefined',
          team: 'Undefined',
        });
      }
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          setIsSignedIn(true);
          setIsFetching(false);
        } else {
          setIsFetching(false);
        }
      });
    } else {
      setIsSignedIn(false);
    }
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
          onClick={async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithRedirect(provider);
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
