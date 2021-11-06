import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Link, Menu, Pane, Popover, Position, Small, Text } from 'evergreen-ui';
import User from '../records/User';
import * as UserSelectors from '../selectors/UserSelectors';
import * as UserActions from '../actions/UserActions';
import LoginFormContainer from './LoginFormContainer';
import SignupFormContainer from './SignupFormContainer';

const MAX_USERNAME_LENGTH = 20;

function truncate(str, length) {
  const truncated = str.substr(0, length);
  if (truncated.length < str.length) {
    return `${truncated} [...]`;
  }
  return str;
}

function UserMenuUnauthed(props) {
  return (
    <Pane>
      <Popover position={Position.BOTTOM_RIGHT} content={({ close }) => <LoginFormContainer close={close} />}>
        <Link color="neutral" size={300} href="#">
          Login
        </Link>
      </Popover>
      <span style={{ paddingLeft: 6, paddingRight: 6 }}>/</span>
      <Popover position={Position.BOTTOM_RIGHT} content={({ close }) => <SignupFormContainer close={close} />}>
        <Link color="neutral" size={300} href="#">
          Signup
        </Link>
      </Popover>
    </Pane>
  );
}

function UserMenuAuthed(props) {
  const { user, logoutUser } = props;
  return (
    <Pane>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={logoutUser}>
                Logout
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <Link href="#">
          <Icon icon="user" color="muted" marginRight={6} position="relative" top={4} />
          <Text>
            <Small>{truncate(user.get('username'), MAX_USERNAME_LENGTH)}</Small>
          </Text>
        </Link>
      </Popover>
    </Pane>
  );
}

function UserMenu(props) {
  const { initialized, user } = props;

  if (!initialized) {
    return null;
  }

  if (!user) {
    return UserMenuUnauthed(props);
  }

  return UserMenuAuthed(props);
}

UserMenu.propTypes = {
  initialized: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(User),
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    initialized: UserSelectors.isInitialized(state),
    user: UserSelectors.getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(UserActions.logoutUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
