import { APP_STARTED } from '../constants/ActionTypes';

const INITIAL_STATE = {
  running: false,
};

const AppState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_STARTED:
      return {
        running: true,
      };
    default:
      return state;
  }
};

export default AppState;
