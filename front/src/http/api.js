import * as A from '../context/auth/Auth.actions';

const apiUrl = process.env.REACT_APP_BENDER_HOST;

const requestMethods = { post: 'POST', get: 'GET' };
const endpoint = {
  login: '/login',
  signin: '/signin',
  about: '/about',
  google: '/google',
  me: '/me',
  book: '/book/flight',
};

export const fetchForm = async (action, { body, method, token = '' }) => {
  const headers = new Headers();
  headers.append('Authorization', token);

  return await fetch(`${apiUrl}${action}`, { method, headers, body });
};

export const fetchBender = async (action, { body, method, token = '' }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Authorization', token);

  const res = await fetch(`${action}`, { method: method, headers: headers, body: JSON.stringify(body) });

  const json = res.json();
  return json;
};

export async function benderLogin(req, { setErrorMessage, setToken, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.login}`, {
      method: requestMethods.post,
      body: { ...req },
    });

    if (!res.ok) {
      throw res;
    }
    setToken(res.token);
  } catch (err) {
    dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}
export async function googleLogin(req, { setErrorMessage, setToken, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.google}`, {
      method: requestMethods.post,
      body: { idtoken: req },
    });

    if (!res.ok) {
      throw res;
    }
    setToken(res.token);
    dispatch(A.switchBoolean({ name: 'google', value: false }));
  } catch (err) {
    dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}
export async function benderSignin(req, { setErrorMessage, setToken, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.signin}`, {
      method: requestMethods.post,
      body: { ...req },
    });

    if (!res.ok) {
      throw res;
    }
    setToken(res.token);
  } catch (err) {
    dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}
export async function makeBooking(req, { token, errorMessage, setErrorMessage, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.book}`, {
      method: requestMethods.post,
      body: { ...req },
    });
    //TODO: mostrar reserva en pantalla.

    if (!res.ok) {
      throw res;
    }
    // setToken(res.token);
  } catch (err) {
    // dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}

export function getPhoto(photo, token, dispatch) {
  if (!photo) {
  } else {
    if (!photo.includes('googleusercontent') && !photo.includes('localhost')) {
      const getAvatar = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_BENDER_HOST}/user/image?user=${photo}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: token,
            },
          });

          if (res.status === 200) {
            const img = await res.blob();
            const localUrl = URL.createObjectURL(img);
            dispatch(A.setAvatar(localUrl));
          }
        } catch (err) {}
      };
      getAvatar();
    }
  }
}

export async function deleteAccount(token, dispatch) {
  const res = await fetch(`${process.env.REACT_APP_BENDER_HOST}/update/delete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const json = await res.json();
  json.ok && dispatch(A.authFailure());
}
