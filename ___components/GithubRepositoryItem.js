import PropTypes from 'prop-types';
import React from 'react';
import {Highlighter} from 'react-bootstrap-typeahead';

const GithubRepositoryItem = ({repository, optionsProps, highlightMatches}) => {
  const {owner: {login, avatar_url}} = repository;

  const getRepositoryName = () => {
    if (highlightMatches) {
      return (
        <Highlighter search={optionsProps.text}>
          {repository.name}
        </Highlighter>
      );
    }

    return <span>{repository.name}</span>;
  };

  return (
    <div>
      <img
        alt={login}
        src={avatar_url}
        style={{
          height: '24px',
          marginRight: '10px',
          width: '24px',
        }}
      />
      {getRepositoryName()}

    </div>
  )
};

GithubRepositoryItem.propTypes = {
  repository: PropTypes.object.isRequired,
  optionsProps: PropTypes.object.isRequired,
  highlightMatches: PropTypes.bool,
};

export default GithubRepositoryItem;
