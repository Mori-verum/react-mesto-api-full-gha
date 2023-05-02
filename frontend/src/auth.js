// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.stasy.nomoredomains.monster';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}`);
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then((res) => checkResponse(res))
    // .then((data) => {
    //   console.log(data);
    //   if (data.token) {
    //     localStorage.setItem('token', data.token);
    //     return data;
    //   }
    // })
    .catch(err => console.log(err))
}

export const checkToken = () => {
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => checkResponse(res))
}