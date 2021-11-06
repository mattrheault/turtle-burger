import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import { Button, Code, Heading, Pane, Text } from 'evergreen-ui';

function AuthorRow(props) {
  return (
    <Pane
      className="author-row"
      display="flex"
      alignItems="center"
      display="flex"
      onClick={props.onAuthorSelect}
      key={props.username}
    >
      <Pane flex={1}>
        <div>
          <Text size={500}>
            {props.username}
          </Text>
        </div>
        <div>
          <Text size={300} color="muted">
            {props.annotations} annotations
          </Text>
        </div>
      </Pane>
      <Pane>
        <Button appearance="minimal" iconAfter="arrow-right" className="author-row-inner-button">
          View Annotations
        </Button>
      </Pane>
    </Pane>
  );
}

function AuthorSelector(props) {
  const {
    authors,
    currentTargetAuthor,
    updateCurrentTargetAuthor,
  } = props;
  const [showAuthors, setShowAuthors] = useState(false);
  const authorSelectionHandler = (author) => () => {
    updateCurrentTargetAuthor(author.get('username'));
    setShowAuthors(false);
  };

  useEffect(() => {
    setShowAuthors(false);
  }, [currentTargetAuthor]);

  let currentTargetAuthorTitle = 'anyone';
  if (currentTargetAuthor) {
    currentTargetAuthorTitle = currentTargetAuthor;
  }

  let AuthorRows;
  if (showAuthors) {
    AuthorRows = authors.map(
      (author) =>
        AuthorRow({
          username: author.get('username'),
          annotations: author.get('annotations'),
          onAuthorSelect: authorSelectionHandler(author),
        })
      )
  }

  return (
    <Pane>
      <Pane display="flex" alignItems="center" marginY={10}>
        <Pane flex={1}>
          <Heading size={400}>
            Annotations by <Code>{currentTargetAuthorTitle}</Code>
          </Heading>
        </Pane>
        <Pane>
          <Button
            appearance="minimal"
            disabled={!authors.size}
            onClick={() => setShowAuthors(!showAuthors)}
            iconBefore={showAuthors ? 'caret-up' : 'caret-down'}
          >
            {showAuthors ? 'Hide Authors' : 'Show Authors'}
          </Button>
        </Pane>
      </Pane>
      {AuthorRows}
    </Pane>
  );
}

AuthorSelector.propTypes = {
  authors: PropTypes.instanceOf(Immutable.List).isRequired,
  currentTargetAuthor: PropTypes.string,
  updateCurrentTargetAuthor: PropTypes.func.isRequired,
};

export default AuthorSelector;
