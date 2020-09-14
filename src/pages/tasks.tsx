/**@jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Button,
  Checkbox,
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

const Container = styled.div();

const TopContainer = styled.div();

const PageTitle = styled.h2();

const TasksContainer = styled.div();

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const [checked, setChecked] = React.useState([0]);

  const fetchTasks = async () => {
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

  // React.useEffect(() => {
  // let unmounted = false;

  // (async () => {
  //   const result = await fetchTasks();

  //   if (!unmounted) {
  //     setTasks(result);
  //   }
  // })();

  // return () => {
  //   unmounted = true;
  // };
  // });

  return (
    <Layout>
      <Container>
        <TopContainer>
          <PageTitle>Tasks</PageTitle>
          <TaskModal />
        </TopContainer>
        <TasksContainer>
          <List>
            {[0, 1, 2, 3].map(value => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
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
      </Container>
    </Layout>
  );
};

export default Tasks;
