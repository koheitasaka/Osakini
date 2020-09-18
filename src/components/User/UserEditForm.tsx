/**@jsx jsx */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, FormLabel, TextField } from '@material-ui/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { auth, functions } from '../../config';
import { IUser } from '../../../functions/src/types';

interface IValues {
  name: string;
  position: string;
  team: string;
  id: string;
}

interface IProps {
  handleClose: () => void;
  updateUser: () => void;
  values: IUser;
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

const UserEditForm: React.FC<IProps> = ({
  handleClose,
  updateUser,
  values,
}) => {
  const validation = () => {
    Yup.object().shape({
      name: Yup.string().required('必須項目です'),
      position: Yup.string().required('必須項目です'),
      team: Yup.string().required('必須項目です'),
    });
  };

  const setUserValue = () => {
    updateUser();
  };

  const onSubmit = async (values: IValues) => {
    const updateUser = functions.httpsCallable('updateUser');
    await updateUser(values);
    setUserValue();
    handleClose();
  };

  return (
    <Formik
      initialValues={{
        name: values.name,
        position: values.position,
        team: values.team,
        id: auth.currentUser?.uid as string,
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
              value={values.name}
              onChange={handleChange}
            />
            <span>{errors.name}</span>
          </FormContainer>
          <FormContainer>
            <FormLabel>Position</FormLabel>
            <TextField
              name="position"
              type="text"
              fullWidth
              value={values.position}
              onChange={handleChange}
            />
            <span>{errors.position}</span>
          </FormContainer>
          <FormContainer>
            <FormLabel>Team</FormLabel>
            <TextField
              name="team"
              type="text"
              fullWidth
              value={values.team}
              onChange={handleChange}
            />
            <span>{errors.team}</span>
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

export default UserEditForm;
