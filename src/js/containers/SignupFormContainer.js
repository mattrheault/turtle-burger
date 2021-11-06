import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Heading, Icon, Link, Pane, Text } from 'evergreen-ui';
import { validateEmail, validateUsername, validatePassword } from '../utils/validators';
import { signupUser } from '../actions/UserActions';
import * as UserSelectors from '../selectors/UserSelectors';
import SignupForm from '../components/SignupForm';

function renderError(hasError, error) {
  if (!hasError || typeof error !== 'string') {
    return null;
  }

  return (
    <Pane display="flex" alignItems="center" marginTop={20} marginBottom={10}>
      <Icon icon="ban-circle" color="danger" marginRight={12} />
      <Text color="#BF0E08">
        {error}
      </Text>
    </Pane>
  );
}

function SignupFormContainer(props) {
  const { isLoading, animationDelay, hasError, error, close, submit } = props;

  // close open form before hydrating user
  useEffect(() => {
    if (animationDelay && animationDelay > 0) {
      setTimeout(close, animationDelay - 100);
    }
  }, [animationDelay]);

  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const emailIsValid = validateEmail(email);
  const usernameIsValid = validateUsername(username);
  const passwordIsValid = validatePassword(password);
  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (email && emailIsValid && username && usernameIsValid && password && passwordIsValid) {
      submit(email, username, password);
    }
  };

  return (
    <Pane
      width={320}
      padding={16}
    >
      <Link href="#" onClick={close}>
        <Icon
          icon="cross"
          color="muted"
          position="absolute"
          size={16}
          top={16}
          right={16}
          onClick={close}
        />
      </Link>
      <Heading size={500}>
        Join Now
      </Heading>
      <Text color="muted" marginTop={20} display="block" marginY={12}>
        Account required to post annotations.
      </Text>
      <SignupForm
        isLoading={isLoading}
        animationDelay={animationDelay}
        hasError={hasError}
        email={email || ""}
        username={username || ""}
        password={password || ""}
        emailIsValid={emailIsValid}
        usernameIsValid={usernameIsValid}
        passwordIsValid={passwordIsValid}
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        submit={handleSubmit}
        close={close}
      />
      {renderError(hasError, error)}
    </Pane>
  );
}

SignupFormContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  animationDelay: PropTypes.number.isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    isLoading: UserSelectors.isLoading(state),
    hasError: UserSelectors.hasError(state),
    error: UserSelectors.getError(state),
    animationDelay: UserSelectors.getAnimationDelay(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email = '', username = '', password = '') => dispatch(signupUser(email, username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupFormContainer);
