/**@jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
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
import Layout from '../components/Layout/Layout';
import { auth, functions } from '../config';
import TaskModal from '../components/Tasks/TaskModal';
import { ITaskData } from '../../functions/src/types';

const Container = styled.div();

const TopContainer = styled.div();

const PageTitle = styled.h2();

const ProgressContainer = styled.div({
  marginTop: '32px',
  textAlign: 'center',
});

const TasksContainer = styled.div();

const Tasks = () => {
  const [tasks, setTasks] = React.useState([] as ITaskData[]);
  const [checked, setChecked] = React.useState([0]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);

  const fetchTasks = async () => {
    setIsFetching(true);
    const fetchTasks = functions.httpsCallable('fetchTasks');
    const result = await fetchTasks();
    return result.data;
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const changeSubmiting = () => {
    setIsCreating(true);
  };

  const successSubmit = async () => {
    const result = await fetchTasks();
    setTasks(result);
    setIsCreating(false);
    setIsFetching(false);
  };

  React.useEffect(() => {
    let unmounted = false;

    (async () => {
      const result = await fetchTasks();

      if (!unmounted) {
        setTasks(result);
        console.log(result);
        setIsFetching(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Layout>
      <Container>
        <TopContainer>
          <PageTitle>Tasks</PageTitle>
          <TaskModal
            changeSubmiting={changeSubmiting}
            successSubmit={successSubmit}
          />
        </TopContainer>
        {isCreating || isFetching ? (
          <ProgressContainer>
            <CircularProgress />
          </ProgressContainer>
        ) : (
          <TasksContainer>
            {/* {tasks.map(task => (
              <p>{task.name}</p>
            ))} */}
            <List>
              {tasks.map(task => {
                const labelId = `checkbox-list-label-${task.name}`;
                return (
                  <ListItem key={task.id} role={undefined} dense button>
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
