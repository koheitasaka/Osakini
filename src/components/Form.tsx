import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Divider, FormControl, FormLabel, TextField } from '@material-ui/core';
import { functions } from '../config/';

interface IValues {
  name: string;
  position: string;
  team: string;
}

interface IProps {
  activateUser: () => void;
}

const Form: React.FC<IProps> = ({ activateUser }) => {
  const validation = () => {
    Yup.object().shape({
      name: Yup.string().required('必須項目です'),
      position: Yup.string().required('必須項目です'),
      team: Yup.string().required('必須項目です'),
    });
  };

  const onSubmit = async (values: IValues) => {
    // const createUser = functions.httpsCallable('createUser');
    // const result = await createUser(values);
    console.log(values);
    // if (result.data === 'success') {
    //   activateUser();
    // }
  };

  return (
    <Formik
      initialValues={{ name: '', position: '', team: '' }}
      validationSchema={validation()}
      onSubmit={(values: IValues) => onSubmit(values)}
      render={({ errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <TextField
                name="name"
                type="text"
                placeholder="nameを入力してください"
                variant="outlined"
                onChange={handleChange}
              />
              <span>{errors.name}</span>
            </FormControl>
            <Divider />
          </div>
          <div>
            <FormControl>
              <FormLabel>Position</FormLabel>
              <TextField
                name="position"
                type="text"
                placeholder="positionを入力してください"
                variant="outlined"
                onChange={handleChange}
              />
              <span>{errors.position}</span>
            </FormControl>
            <Divider />
          </div>
          <div>
            <FormControl>
              <FormLabel>Team</FormLabel>
              <TextField
                name="team"
                type="text"
                placeholder="teamを入力してください"
                variant="outlined"
                onChange={handleChange}
              />
              <span>{errors.team}</span>
            </FormControl>
            <Divider />
          </div>
          <button type="submit">送信</button>
        </form>
      )}
    ></Formik>
  );
};

export default Form;
