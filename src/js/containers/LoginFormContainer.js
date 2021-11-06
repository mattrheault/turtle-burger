import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Heading, Icon, Link, Pane, Text } from 'evergreen-ui';
import { validateEmail, validatePassword } from '../utils/validators';
import { loginUser } from '../actions/UserActions';
import * as UserSelectors from '../selectors/UserSelectors';
import LoginForm from '../components/LoginForm';

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

function LoginFormContainer(props) {
  const { isLoading, animationDelay, hasError, error, close, submit } = props;

  // close open form before hydrating user
  useEffect(() => {
    if (animationDelay && animationDelay > 0) {
      setTimeout(close, animationDelay - 100);
    }
  }, [animationDelay]);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (email && emailIsValid && password && passwordIsValid) {
      submit(email, password);
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
        Account Login
      </Heading>
      <LoginForm
        isLoading={isLoading}
        animationDelay={animationDelay}
        hasError={hasError}
        email={email || ""}
        password={password || ""}
        emailIsValid={emailIsValid}
        passwordIsValid={passwordIsValid}
        setEmail={setEmail}
        setPassword={setPassword}
        submit={handleSubmit}
        close={close}
      />
      {renderError(hasError, error)}
    </Pane>
  );
}

LoginFormContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
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
    submit: (email = '', password = '') => dispatch(loginUser(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
