import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Small, Text } from 'evergreen-ui';

function LogoSlogan(props) {
  return (
    <Text size={400} borderLeft="1px solid #425A70" marginX={8} paddingX={8} position="relative" top={2}>
      <Small>A shell of a time</Small>
    </Text>
  );
}

function Logo(props) {
  const { showSlogan } = props;
  const Slogan = showSlogan ? LogoSlogan(props) : null;

  return (
    <React.Fragment>
      <Heading size={600}>
        <a href="https://glymer.io" target="_blank" className="logo-link">
          Turtle Burger
        </a>
      </Heading>
      {Slogan}
    </React.Fragment>
  );
}

Logo.propTypes = {
  showSlogan: PropTypes.bool.isRequired,
};

export default Logo;
