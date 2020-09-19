/**@jsx jsx */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { auth, functions } from '../../config';
import {
  IDailyTask,
  IReport,
  ITask,
  ITaskData,
} from '../../../functions/src/types';

interface IValues {
  comment: string;
  date: string;
  isSubmited: boolean;
  time: number;
  userId: string;
}

interface IProps {
  changeSubmiting: () => void;
  handleSubmit: () => void;
  date: string;
  isSubmited: boolean;
  tasks?: ITaskData[];
  time: number;
  userId: string;
}

const Form = styled.form({
  width: '100%',
});

const FormContainer = styled.div({
  width: '100%',
  margin: '8px',
});

const TaskContainer = styled.div({
  span: {
    color: 'red',
  },
  div: {
    display: 'flex',
    svg: {
      margin: '30px',
    },
  },
  p: {
    width: '70%',
    padding: '16px',
    borderRadius: '4px',
    backgroundColor: '#99CCFF',
  },
  textAlign: 'left',
});

const IconContainer = styled.div({});

const ButtonContainer = styled.div({
  textAlign: 'center',
  padding: '8px 0',
});

const ReportForm: React.FC<IProps> = ({
  handleSubmit,
  changeSubmiting,
  date,
  isSubmited,
  tasks,
  time,
  userId,
}) => {
  const [selectedTask, setSelectedTask] = React.useState('');
  const [selectedTasks, setSelectedTasks] = React.useState([] as string[]);
  const [duplicateError, setErrorMsg] = React.useState('');

  const validation = () => {
    Yup.object().shape({
      name: Yup.string().required('必須項目です'),
      discription: Yup.string().required('必須項目です'),
    });
  };

  const insertReport = async (values: IValues) => {
    const insertFunc = functions.httpsCallable('insertReport');
    const report: IReport = {
      comment: values.comment,
      date: values.date,
      isSubmited: false,
      userId: values.userId,
      time: values.time,
    };
    await insertFunc(report);
  };

  const insertDailyTask = async (values: IValues) => {
    const insertFunc = functions.httpsCallable('insertDailyTask');
    for (const selectedTask of selectedTasks) {
      const task = tasks?.find(task => task.id === selectedTask);
      const data = {
        userId: values.userId,
        id: selectedTask,
        discription: task?.discription,
        name: task?.name,
        time: 0,
      };
      await insertFunc(data);
    }
  };

  const onSubmit = async (values: IValues) => {
    changeSubmiting();
    await insertReport(values);
    await insertDailyTask(values);
    handleSubmit();
  };

  const handleSelect = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (e.target.value === '') return;

    setSelectedTask(e.target ? e.target.value : '');

    if (selectedTasks.includes(e.target.value)) {
      setErrorMsg('既にそのタスクは選択されています');
      return;
    }

    selectedTasks.push(e.target.value);
    if (duplicateError.length > 0) {
      setErrorMsg('');
    }
    setSelectedTasks(selectedTasks);
  };

  const deleteTask = (task: string) => {
    const newTasks = selectedTasks.filter(
      selectedTask => selectedTask !== task,
    );
    setSelectedTasks(newTasks);
  };

  return (
    <Formik
      initialValues={{
        comment: '',
        date,
        isSubmited,
        time,
        userId,
      }}
      validationSchema={validation()}
      onSubmit={(values: IValues) => onSubmit(values)}
      render={({ errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Task</InputLabel>
              <Select
                placeholder="Add Task"
                value={selectedTask}
                onChange={handleSelect}
                label="task"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {tasks?.map(task => (
                  <MenuItem value={task.id}>{task.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TaskContainer>
              <span>{duplicateError}</span>
              <br />
              {selectedTasks.map(selectedtask => {
                const selected = tasks?.find(task => task.id === selectedtask);
                return (
                  <React.Fragment>
                    <div>
                      <p>{selected?.name}</p>
                      <IconContainer
                        onClick={() => deleteTask(selected?.id || '')}
                      >
                        <HighlightOffIcon />
                      </IconContainer>
                    </div>
                  </React.Fragment>
                );
              })}
            </TaskContainer>
          </FormContainer>
          <FormContainer>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={8}
              fullWidth
              variant="outlined"
              name="comment"
              type="text"
              onChange={handleChange}
            />
          </FormContainer>
          <ButtonContainer>
            <Button type="submit" color="primary" variant="outlined">
              送信
            </Button>
          </ButtonContainer>
        </Form>
      )}
    ></Formik>
  );
};

export default ReportForm;
