/** @jsx jsx */
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { IUser } from '../../../functions/src/types';
import UserEditForm from './UserEditForm';

const Container = styled.div({
  textAlign: 'center',
});

const titleSize = css({
  width: '320px',
});

interface IProps {
  updateUser: () => void;
  values: IUser;
}

const UserEditModal: React.FC<IProps> = ({ updateUser, values }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        プロフィール編集
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" css={titleSize}>
          プロフィール編集
        </DialogTitle>
        <DialogContent>
          <UserEditForm
            handleClose={handleClose}
            updateUser={updateUser}
            values={values}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default UserEditModal;
