import React from 'react';

import { FormDrawer } from './FormDrawer';
import { mailProps, passwordProps, userNameProps, rePasswordProps, bioProps } from './credentialsFormProps';

import { benderSignin } from '../../http/api';

import { useForm } from '../../hooks/useForm';
import './credentials.css';

export const RegisterForm = (props) => {
  const { dispatch, setToken } = props;
  const [
    { email, password, errorMessage, username, repeatPassword, bio },
    handleInputChange,
    setErrorMessage,
    resetInput,
  ] = useForm({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    errorMessage: '',
    bio: '',
  });
  const items = [
    { ...userNameProps, value: username },
    { ...mailProps, value: email },
    { ...passwordProps, value: password },
    { ...rePasswordProps, value: repeatPassword },
    { ...bioProps, value: bio },
  ];

  const req = { username, email, password, repeatPassword, bio };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await benderSignin(req, { setErrorMessage, setToken, dispatch });
  };

  return (
    <FormDrawer
      items={items}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      reset={resetInput}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      setToken={setToken}
      dispatch={dispatch}
    />
  );
};
