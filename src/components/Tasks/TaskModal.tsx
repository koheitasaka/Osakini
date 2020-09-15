/** @jsx jsx */
import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { ITask, ITaskData } from '../../../functions/src/types';
import TaskForm from './TaskForm';
import TaskEditForm from './TaskEditForm';

const Container = styled.div({
  textAlign: 'center',
});

const titleSize = css({
  width: '320px',
});

interface IProps {
  changeSubmiting: () => void;
  successSubmit: () => void;
  isOpen: boolean;
  type: string;
  task?: ITaskData;
}

const TaskModal: React.FC<IProps> = ({
  changeSubmiting,
  successSubmit,
  isOpen,
  type,
  task,
}) => {
  const handleClose = () => {
    successSubmit();
  };
  console.log('task', task);
  console.log('type', type);
  return (
    <Container>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" css={titleSize}>
          タスク
        </DialogTitle>
        <DialogContent>
          {type === 'new' && (
            <TaskForm
              handleClose={handleClose}
              changeSubmiting={changeSubmiting}
            />
          )}
          {type === 'edit' && (
            <TaskEditForm
              values={task as ITaskData}
              handleClose={handleClose}
              changeSubmiting={changeSubmiting}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TaskModal;
