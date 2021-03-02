import React from 'react';

import { useForm } from '../../hooks/useForm';

import { mailProps, passwordProps } from './credentialsFormProps';
import { benderLogin } from '../../http/api';

import './credentials.css';
import { FormDrawer } from './FormDrawer';

export const LoginForm = (props) => {
  const { setToken, dispatch } = props;
  const [{ email, password, errorMessage }, handleInputChange, setErrorMessage, resetInput] = useForm({
    email: '',
    password: '',
    errorMessage: '',
  });

  const items = [
    { ...mailProps, value: email },
    {
      ...passwordProps,
      value: password,
    },
  ];
  const req = { email, password };
  const actions = { setErrorMessage, setToken, dispatch };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await benderLogin(req, actions);
  };

  return (
    <FormDrawer
      items={items}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      reset={resetInput}
      errorMessage={errorMessage}
      {...actions}
    />
  );
};
