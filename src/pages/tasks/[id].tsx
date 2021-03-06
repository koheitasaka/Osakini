/**@jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Button, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
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
  const [task, setTask] = React.useState<ITaskData>();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isOpen, toggleOpen] = React.useState(false);

  const router = useRouter();
  const { id } = router.query;

  const fetchTask = async () => {
    setIsFetching(true);
    const fetchTask = functions.httpsCallable('fetchTask');
    const result = await fetchTask(id);
    const task = {
      ...result.data,
      id,
    };
    return task;
  };

  const changeSubmiting = () => {
    setIsCreating(true);
  };

  const successSubmit = async () => {
    setIsCreating(false);
    const result = await fetchTask();
    setTask(result);
    setIsFetching(false);
  };

  const handleOpen = () => {
    toggleOpen(true);
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  const deleteTask = async () => {
    setIsFetching(true);
    const deleteFunc = functions.httpsCallable('deleteTask');
    await deleteFunc(id);
    setIsFetching(false);
    router.push('/tasks');
  };

  React.useEffect(() => {
    let unmounted = false;

    (async () => {
      const result = await fetchTask();
      if (!unmounted) {
        result
          ? setTask(result)
          : setTask({
              name: '該当するタスクが見つかりませんでした',
              discription: '',
              isCompleted: false,
              id: '',
            });
        console.log(result);
        setIsFetching(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Layout title={task ? task.name : 'Undefined'}>
      <Container>
        {isCreating || isFetching ? (
          <ProgressContainer>
            <CircularProgress />
          </ProgressContainer>
        ) : (
          <React.Fragment>
            <TopContainer>
              <PageTitle>{task?.name}</PageTitle>
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                編集
              </Button>
              <TaskModal
                changeSubmiting={changeSubmiting}
                successSubmit={successSubmit}
                closeModal={handleClose}
                isOpen={isOpen}
                type={'edit'}
                task={task}
              />
            </TopContainer>
            <TasksContainer>
              name: {task?.name}
              <br />
              disc: {task?.discription}
              <br />
              isCompleted: {String(task?.isCompleted)}
            </TasksContainer>
            <Button variant="outlined" color="primary" onClick={deleteTask}>
              削除
            </Button>
            <Link href="/tasks">
              <Button variant="outlined" color="primary">
                Back to Tasks
              </Button>
            </Link>
          </React.Fragment>
        )}
      </Container>
    </Layout>
  );
};

export default Tasks;
