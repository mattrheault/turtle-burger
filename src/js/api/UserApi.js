import User from '../records/User';

const API_BASE = 'https://api.glymer.io';

const getAuthToken = () => {
  let token = '';
  try {
    token = localStorage.getItem('token') || '';
  } catch (err) {}
  return token;
};

const parseUsersApiResponse = (request) => request.then(
  (res) =>
    res.json().then((data) => {
      if (!res.ok || (data && typeof data.user !== 'object')) {
        if (data && data.error && data.error.message) {
          throw new Error(data.error.message);
        }
        if (data && data.errors && data.errors.message) {
          throw new Error(data.errors.message);
        }
        throw new Error('unknown error');
      }
      if (typeof data.user.token === 'string') {
        try {
          localStorage.setItem('token', data.user.token);
        } catch (err) {}
      }
      return new User(data.user);
    })
);

export function fetchCurrentUser() {
  const request = fetch(`${API_BASE}/users/v1/current`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Token ${getAuthToken()}`, 
      'Content-Type': 'application/json'
    }),
  });
  return parseUsersApiResponse(request);
}
