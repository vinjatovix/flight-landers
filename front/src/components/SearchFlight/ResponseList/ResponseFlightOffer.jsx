import React from 'react';
import { fetchBender } from '../../../http/api';

export const ResponseFlightOffer = (props) => {
  const { price, logged } = props;
  const handleBooking = () => {
    const token = localStorage.getItem('token');
    //TODO: abstraer esto a api.js
    // makeBooking(props, { token: token, errorMessage, setErrorMessage });
    const makeBook = async () => {
      await fetchBender(`${process.env.REACT_APP_BENDER_HOST}/book/flight`, {
        token: JSON.parse(token),
        method: 'POST',
        body: { ...props },
      });
    };
    makeBook();
  };
  return (
    <ul className="ResponseFlight__offer">
      <li>{price.total}€</li>
      {logged && (
        <li>
          <div
            className="ResponseFlight__book-trigger"
            onClick={() => {
              handleBooking();
            }}
          ></div>
        </li>
      )}
    </ul>
  );
};
