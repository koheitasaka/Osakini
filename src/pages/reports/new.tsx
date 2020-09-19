/**@jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import Layout from '../../components/Layout/Layout';
import { auth, functions } from '../../config';
import TaskModal from '../../components/Tasks/TaskModal';
import { ITaskData } from '../../../functions/src/types';
import { getToday } from '../../config/utils';
import ReportForm from '../../components/Reports/ReportForm';

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

const CommentContainer = styled.div({
  marginTop: '24px',
});

const Tasks = () => {
  const [tasks, setTasks] = React.useState<ITaskData[]>();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isOpen, toggleOpen] = React.useState(false);

  const today = getToday();

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
    setIsCreating(false);
    // const result = await fetchTask();
    // setTask(result);
    setIsFetching(false);
  };

  React.useEffect(() => {
    let unmounted = false;

    (async () => {
      const result = await fetchTasks();
      if (!unmounted) {
        result
          ? setTasks(result)
          : setTasks([
              {
                name: '該当するタスクが見つかりませんでした',
                discription: '',
                isCompleted: false,
                id: '',
              },
            ]);
        setIsFetching(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Layout title="New Report">
      <Container>
        {isCreating || isFetching ? (
          <ProgressContainer>
            <CircularProgress />
          </ProgressContainer>
        ) : (
          <React.Fragment>
            <TopContainer>
              <PageTitle>{today}</PageTitle>
            </TopContainer>
            <CommentContainer>
              <ReportForm
                changeSubmiting={changeSubmiting}
                handleSubmit={successSubmit}
                date={today}
                isSubmited={false}
                tasks={tasks}
                time={0}
                userId={auth.currentUser?.uid as string}
              />
            </CommentContainer>
          </React.Fragment>
        )}
      </Container>
    </Layout>
  );
};

export default Tasks;
