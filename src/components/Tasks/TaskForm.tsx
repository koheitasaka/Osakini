/**@jsx jsx */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, FormLabel, TextField } from '@material-ui/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { functions } from '../../config';

interface IValues {
  name: string;
  discription: string;
  isCompleted: boolean;
}

interface IProps {
  handleClose: () => void;
  changeSubmiting: () => void;
  handleSubmit: () => void;
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

const TaskForm: React.FC<IProps> = ({
  handleClose,
  handleSubmit,
  changeSubmiting,
}) => {
  const validation = () => {
    Yup.object().shape({
      name: Yup.string().required('必須項目です'),
      discription: Yup.string().required('必須項目です'),
    });
  };

  const onSubmit = async (values: IValues) => {
    handleClose();
    changeSubmiting();
    const insertTask = functions.httpsCallable('insertTask');
    await insertTask(values);
    handleSubmit();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        discription: '',
        isCompleted: false,
      }}
      validationSchema={validation()}
      onSubmit={(values: IValues) => onSubmit(values)}
      render={({ errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <FormLabel>Name</FormLabel>
            <TextField
              name="name"
              type="text"
              fullWidth
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

export default TaskForm;
