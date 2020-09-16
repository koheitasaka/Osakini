/**@jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { functions } from '../../config';
import TaskModal from '../../components/Tasks/TaskModal';
import { ITaskData } from '../../../functions/src/types';

const Container = styled.div({
  width: '80%',
  margin: '8px auto',
});

const TopContainer = styled.div({
  width: '100%',
  display: 'flex',
  button: {
    height: '32px',
    margin: '0 4px 0 auto',
  },
});

const PageTitle = styled.h2({
  margin: '0',
});

const ProgressContainer = styled.div({
  marginTop: '32px',
  textAlign: 'center',
});

const TasksContainer = styled.div();

const Tasks = () => {
  const [tasks, setTasks] = React.useState([] as ITaskData[]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isOpen, toggleOpen] = React.useState(false);

  const fetchTasks = async () => {
    setIsFetching(true);
    const fetchTasks = functions.httpsCallable('fetchTasks');
    const result = await fetchTasks();
    return result.data;
  };

  const changeSubmiting = () => {
    setIsCreating(true);
  };

  const successSubmit = async () => {
    const result = await fetchTasks();
    setTasks(result);
    setIsCreating(false);
    setIsFetching(false);
    toggleOpen(false);
  };

  const handleOpen = () => {
    toggleOpen(true);
  };

  const closeModal = () => {
    toggleOpen(false);
  };

  React.useEffect(() => {
    let unmounted = false;

    (async () => {
      const result = await fetchTasks();

      if (!unmounted) {
        setTasks(result);
        setIsFetching(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Layout title="Task">
      <Container>
        <TopContainer>
          <PageTitle>Tasks</PageTitle>
          <Button variant="outlined" color="primary" onClick={handleOpen}>
            新規タスク
          </Button>
          <TaskModal
            changeSubmiting={changeSubmiting}
            successSubmit={successSubmit}
            closeModal={closeModal}
            isOpen={isOpen}
            type={'new'}
          />
        </TopContainer>
        {isCreating || isFetching ? (
          <ProgressContainer>
            <CircularProgress />
          </ProgressContainer>
        ) : (
          <TasksContainer>
            <List>
              {tasks.map(task => {
                const labelId = `checkbox-list-label-${task.name}`;
                return (
                  <Link
                    href="/tasks/[id]"
                    as={`/tasks/${task.id}`}
                    key={task.id}
                  >
                    <ListItem role={undefined} dense button>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={task.isCompleted}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={task.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <CommentIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </TasksContainer>
        )}
      </Container>
    </Layout>
  );
};

export default Tasks;
