import {
  USER_AUTO_LOGIN_STARTED,
  USER_AUTO_LOGIN_COMPLETED,
  USER_AUTO_LOGIN_FAILED,
} from '../constants/ActionTypes';

const INITIAL_STATE = {
  initialized: false,
  loading: false,
  error: null,
  animationDelay: 0,
  user: null,
};

const UserState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // USER_AUTO_LOGIN
    case USER_AUTO_LOGIN_STARTED:
      return {
        initialized: false,
        loading: true,
        error: null,
        animationDelay: 0,
        user: state.user,
      };
    case USER_AUTO_LOGIN_COMPLETED:
      return {
        initialized: true,
        loading: false,
        error: null,
        animationDelay: 0,
        user: action.payload.user,
      };
    case USER_AUTO_LOGIN_FAILED:
      return {
        initialized: true,
        loading: false,
        error: null,
        animationDelay: 0,
        user: state.user,
      };
    default:
      return state;
  }
};

export default UserState;
