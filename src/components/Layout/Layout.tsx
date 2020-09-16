/** @jsx jsx */
import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { auth } from '../../config';

type Props = {
  title: string;
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

const Layout = ({ title, children }: Props) => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <React.Fragment>
      <Head>
        <title>{title} | osakini</title>
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
