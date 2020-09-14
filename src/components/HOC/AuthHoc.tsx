/**@jsx jsx */
import React from 'react';
import firebase from 'firebase';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { CircularProgress } from '@material-ui/core';
import { auth, functions } from '../../config/';
import Layout from '../Layout/Layout';

type Props = {
  children?: React.ReactNode;
};

const ProgressContainer = styled.div({
  marginTop: '32px',
  textAlign: 'center',
});

const ImageContainer = styled.div({
  textAlign: 'center',
  marginTop: '320px',
});

const SignInBtn = styled.img({
  maxWidth: '250px',
  cursor: 'pointer',
  margin: '20px',
  ':hover': {
    opacity: '0.8',
  },
});

const AuthHoc = ({ children }: Props) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const checkAuth = async () => {
    setIsFetching(true);
    const redirectResult = await auth.getRedirectResult();
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
          setIsSignedIn(false);
        }
      });
    } else {
      setIsFetching(false);
      setIsSignedIn(false);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return isFetching ? (
    <Layout>
      <ProgressContainer>
        <CircularProgress />
      </ProgressContainer>
    </Layout>
  ) : !isSignedIn ? (
    <Layout>
      <ImageContainer>
        <SignInBtn
          src="/google_sign_in.png"
          alt="サインイン"
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
          }}
        />
      </ImageContainer>
    </Layout>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default AuthHoc;
