import {
  USER_AUTO_LOGIN_STARTED,
  USER_AUTO_LOGIN_COMPLETED,
  USER_AUTO_LOGIN_FAILED,
} from '../constants/ActionTypes';
import * as UserApi from '../api/UserApi';
import { reportError } from '../api/ErrorReportApi';

export const autoLoginUser = () => (dispatch) => {
  dispatch({ type: USER_AUTO_LOGIN_STARTED });

  UserApi.fetchCurrentUser()
    .then((user) => {
      dispatch({
        type: USER_AUTO_LOGIN_COMPLETED,
        payload: { user },
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_AUTO_LOGIN_FAILED,
        payload: { err: err.message },
      });
      reportError(err);
    });
};
