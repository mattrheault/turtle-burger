export function isInitialized(state) {
  return state.UserState.initialized;
}

export function isLoading(state) {
  return state.UserState.loading;
}

export function hasError(state) {
  return !!state.UserState.error;
}

export function getError(state) {
  return state.UserState.error;
}

export function getAnimationDelay(state) {
  return state.UserState.animationDelay;
}

export function getUser(state) {
  return state.UserState.user;
}
