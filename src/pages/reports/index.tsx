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
import dayjs from 'dayjs';
import Layout from '../../components/Layout/Layout';
import { functions } from '../../config';
import TaskModal from '../../components/Tasks/TaskModal';
import { IReportData, ITaskData } from '../../../functions/src/types';

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
  const [reports, setReports] = React.useState([] as IReportData[]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);

  const fetchReports = async () => {
    setIsFetching(true);
    const fetchReports = functions.httpsCallable('fetchReports');
    const res = await fetchReports();
    const result = res.data as any[];
    const data = result.map(report => {
      const date = dayjs.unix(report.date._seconds);
      console.log(date);
      return {
        ...report,
        date: date,
      };
    });
    return data;
  };

  const changeSubmiting = () => {
    setIsCreating(true);
  };

  const successSubmit = async () => {
    const result = await fetchReports();
    setReports(result);
    setIsCreating(false);
    setIsFetching(false);
  };

  React.useEffect(() => {
    let unmounted = false;

    (async () => {
      const result = await fetchReports();
      console.log(result);
      if (!unmounted) {
        setReports(result);
        setIsFetching(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Layout title="Reports">
      <Container>
        <TopContainer>
          <PageTitle>Reports</PageTitle>
        </TopContainer>
        {isCreating || isFetching ? (
          <ProgressContainer>
            <CircularProgress />
          </ProgressContainer>
        ) : (
          <TasksContainer>
            <List>
              {reports.map((report, idx) => {
                const labelId = `checkbox-list-label-${idx}`;
                return (
                  // <Link href="/tasks/[id]" as={`/t/${report.id}`} key={idx}>
                  <ListItem role={undefined} dense button key={report.date}>
                    <ListItemText
                      id={labelId}
                      primary={`${dayjs(report.date).format('YYYY/MM/DD')}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  // </Link>
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
