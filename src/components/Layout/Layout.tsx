/** @jsx jsx */
import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { auth, functions } from '../../config';

type Props = {
  children?: ReactNode;
};

const Container = styled.div({
  marginBottom: '10px',
  display: 'flex',
  height: '100vh',
});

const Side = styled.div({
  width: '320px',
  backgroundColor: '#212542fc',
  color: '#FFFFFF',
});

const SideContainer = styled.div({
  padding: '0 40px',
});

const Main = styled.div({
  marginTop: '40px',
  textAlign: 'center',
  width: '100%',
});

const Layout = ({ children }: Props) => {
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
    <React.Fragment>
      <Head>
        <title>HOME | osakini</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Side>
          <SideContainer>
            <Link href="/">
              <p>Home</p>
            </Link>
            <Link href="/tasks">
              <p>Tasks</p>
            </Link>
            <p onClick={() => handleLogout()}>Logout</p>
          </SideContainer>
        </Side>
        <Main>{children}</Main>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
