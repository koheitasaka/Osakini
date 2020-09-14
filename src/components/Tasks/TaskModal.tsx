/** @jsx jsx */
import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { IUser } from '../../../functions/src/types';
import UserEditForm from './UserEditForm';
import TaskForm from './TaskForm';

const Container = styled.div({
  textAlign: 'center',
});

const titleSize = css({
  width: '320px',
});

interface IProps {
  changeSubmiting: () => void;
  successSubmit: () => void;
}

const TaskModal: React.FC<IProps> = ({ changeSubmiting, successSubmit }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    successSubmit();
  };

  return (
    <Container>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        新規タスク
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" css={titleSize}>
          タスク追加
        </DialogTitle>
        <DialogContent>
          <TaskForm
            handleClose={handleClose}
            changeSubmiting={changeSubmiting}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TaskModal;
