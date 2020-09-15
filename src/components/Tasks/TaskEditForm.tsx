/**@jsx jsx */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Checkbox, FormLabel, TextField } from '@material-ui/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { functions } from '../../config';
import { ITaskData } from '../../../functions/src/types';

interface IValues {
  id: string;
  name: string;
  discription: string;
  isCompleted: boolean;
}

interface IProps {
  values: ITaskData;
  handleClose: () => void;
  changeSubmiting: () => void;
}

const Form = styled.form({
  width: '400px',
});

const FormContainer = styled.div({
  width: '100%',
  margin: '8px',
});

const ButtonContainer = styled.div({
  textAlign: 'center',
  padding: '8px 0',
});

const TaskEditForm: React.FC<IProps> = ({
  values,
  handleClose,
  changeSubmiting,
}) => {
  const validation = () => {
    Yup.object().shape({
      name: Yup.string().required('必須項目です'),
      discription: Yup.string().required('必須項目です'),
    });
  };
  const onSubmit = async (values: IValues) => {
    changeSubmiting();
    const updateTask = functions.httpsCallable('updateTask');
    await updateTask(values);
    handleClose();
  };
  console.log(values);
  return (
    <Formik
      initialValues={values}
      validationSchema={validation()}
      onSubmit={(values: IValues) => onSubmit(values)}
      render={({ errors, handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <Checkbox
              checked={values.isCompleted}
              onChange={handleChange('isCompleted')}
              name="isCompleted"
              color="secondary"
            />
            <FormLabel>Complete!</FormLabel>
            <span>{errors.isCompleted}</span>
          </FormContainer>
          <FormContainer>
            <FormLabel>Name</FormLabel>
            <TextField
              name="name"
              type="text"
              fullWidth
              value={values.name}
              onChange={handleChange}
            />
            <span>{errors.name}</span>
          </FormContainer>
          <FormContainer>
            <FormLabel>Discription</FormLabel>
            <TextField
              name="discription"
              type="text"
              fullWidth
              value={values.discription}
              onChange={handleChange}
            />
            <span>{errors.discription}</span>
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

export default TaskEditForm;
