import {
  APP_STARTED,
} from '../constants/ActionTypes';

export const startApp = () => (dispatch) => {
  dispatch({ type: APP_STARTED });
};
