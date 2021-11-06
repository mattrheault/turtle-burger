import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as QueryString from 'query-string';
import { Pane } from 'evergreen-ui';
import * as UserActions from '../actions/UserActions';
import * as UserSelectors from '../selectors/UserSelectors';
import UserMenu from './UserMenu';
import Logo from '../components/Logo';
import User from '../records/User';

function Application(props) {
  const {
    initializeUser,
  } = props;

  useEffect(() => {
    console.log('FETCHING USER');
    initializeUser();
  }, []);

  return (
    <Pane className="box container centered" marginX={6} marginY={20}>
      <Pane display="flex" marginBottom={14} paddingX={8}>
        <Pane flex={1} alignItems="center" display="flex">
          <Logo showSlogan={true} />
        </Pane>
        <Pane>
          <UserMenu />
       </Pane>
      </Pane>
      <Pane display="block" flex={0} paddingX={8} paddingY={8} height={300}>
        <p>
          Hello world...
        </p>
      </Pane>
    </Pane>
  );
}

Application.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  query: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  userInitialized: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(User),
  initializeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  const { history } = props;
  const query = QueryString.parse(history.location.search) || {};
  const url = decodeURIComponent(query.url) || '';
  return {
    query,
    url,
    userInitialized: UserSelectors.isInitialized(state),
    isAuthed: !!UserSelectors.getUser(state),
    user: UserSelectors.getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeUser: () => dispatch(UserActions.autoLoginUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
