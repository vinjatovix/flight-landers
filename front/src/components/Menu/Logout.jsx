import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const Logout = () => {
  return <GoogleLogout clientId={clientId} buttonText="Logout" />;
};
