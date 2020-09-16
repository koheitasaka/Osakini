/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';
import { IUser } from '../../../functions/src/types';
import UserEditModal from '../User/UserEditModal';

interface IProps {
  userName?: string;
  position: string;
  team: string;
  updateUser: () => void;
  isUpdating: boolean;
}

const ProgressContainer = styled.div({
  marginTop: '32px',
  textAlign: 'center',
});

const UserContainer = styled.div({
  margin: '200px',
});

const UserName = styled.h2({
  marginTop: '32px',
  textAlign: 'center',
});

const UserInfo = styled.h4({
  textAlign: 'center',
  color: '#6B6B6B',
});

const UserPage: React.FC<IProps> = ({
  userName,
  position,
  team,
  updateUser,
  isUpdating,
}) => {
  const userValue: IUser = {
    name: userName as string,
    position,
    team,
  };

  return (
    <UserContainer>
      {isUpdating ? (
        <ProgressContainer>
          <CircularProgress />
        </ProgressContainer>
      ) : (
        <UserContainer>
          <UserName>{userName} 👋</UserName>
          <UserInfo>position: {position}</UserInfo>
          <UserInfo>team: {team}</UserInfo>
          <UserEditModal updateUser={updateUser} values={userValue} />
        </UserContainer>
      )}
    </UserContainer>
  );
};

export default UserPage;
