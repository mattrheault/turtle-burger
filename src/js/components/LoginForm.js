import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Pane, TextInputField } from 'evergreen-ui';
import { loginUser } from '../actions/UserActions';

function SuccessIcon(props) {
  if (!props.show) {
    return null;
  }

  return (
    <Icon
      className="animate-bounce-in"
      icon="tick-circle"
      color="success"
      marginRight={16}
    />
  );
}

function LoginForm(props) {
  const { isLoading, animationDelay, email, password, emailIsValid, passwordIsValid, setEmail, setPassword, submit } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && emailIsValid && password && passwordIsValid) {
      submit(email, password);
    }
  };
  const emailInputDynamicProps = {};
  const passwordInputDynamicProps = {};

  if (email && !emailIsValid) {
    emailInputDynamicProps.isInvalid = true;
    emailInputDynamicProps.validationMessage = "Email must be valid.";
  }

  if (password && !passwordIsValid) {
    passwordInputDynamicProps.validationMessage = "Password must satisfy rules.";
    passwordInputDynamicProps.isInvalid = true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Pane marginTop={20}>
        <TextInputField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          disabled={isLoading}
          required={true}
          label="Email"
          {...emailInputDynamicProps}
        />
        <TextInputField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          disabled={isLoading}
          required={true}
          label="Password"
          hint="Password must be at least 6 characters, contain 1 capital letter, and 1 number."
          {...passwordInputDynamicProps}
        />
      </Pane>
      <Pane display="flex" alignItems="center" marginBottom={10}>
        <Pane>
          <Button
            disabled={!emailIsValid || !passwordIsValid || isLoading}
            isLoading={isLoading}
            appearance="primary"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Pane>
        <Pane marginX={10}>
          <SuccessIcon show={animationDelay > 0} />
        </Pane>
      </Pane>
    </form>
  );
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  animationDelay: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  emailIsValid: PropTypes.bool.isRequired,
  passwordIsValid: PropTypes.bool.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default LoginForm;
