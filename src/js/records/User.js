import { Record } from 'immutable';

const User = Record({
  _id: -1,
  email: '',
  username: '',
  token: '',
  verified: false,
  active: false,
});

export default User;
