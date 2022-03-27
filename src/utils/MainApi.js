export const BASE_URL = 'http://localhost:3001';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const signup = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => {
      return checkResponse(res);
    })
};

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkResponse(res);
    })
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
};

export const getCurrentUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const updateCurrentUserInfo = ({ email, name }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      name,
    })
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const addMovie = () => {

}