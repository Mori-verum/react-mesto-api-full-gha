export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _returnJson(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("Ошибка: " + res.status);
  }

  _request(url, options) {
    return fetch(url, options).then(this._returnJson)
  }

  getDataProfile() {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
  }

  setUserInfo(data) {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  setUserAvatar(avatar) {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  addCard(data) {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(id) {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
  }

  getAllCards() {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('token');

    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
});
