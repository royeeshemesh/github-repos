import React from 'react';
import PropTypes from 'prop-types';

const RepositorySummaryDetails = props => {
  const {repository} = props;
  const {owner} = repository;

  return (
    <table className="summary-table">
      <tbody>
      <tr>
        <td>
          <b>Name: </b>
        </td>
        <td>
          <a target="_blank" href={repository.html_url} rel="noopener noreferrer">{repository.name} </a>

          <img
            alt={owner.login}
            src={owner.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
        </td>
      </tr>

      {repository.homepage && <tr>
        <td>
          <b>Homepage:</b>
        </td>
        <td>
          <a href={repository.homepage} target="_blank" rel="noopener noreferrer">{repository.homepage}</a>
        </td>
      </tr>}

      <tr>
        <td>
          <b>Type: </b>
        </td>
        <td>{owner.type}</td>
      </tr>

      {repository.description && <tr>
        <td>
          <b>Description: </b>
        </td>
        <td>{repository.description}</td>
      </tr>}

      <tr>
        <td>
          <b>Stars:</b>
        </td>
        <td><span>&#9733; {repository.stargazers_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </td>
      </tr>

      <tr>
        <td>
          <b>Watchers:</b>
        </td>
        <td><span>{repository.watchers_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </td>
      </tr>

      <tr>
        <td>
          <b>Created at:</b>
        </td>
        <td><span>{new Date(repository.created_at).toDateString()}</span></td>
      </tr>

      <tr>
        <td>
          <b>Open issues:</b>
        </td>
        <td><span>{repository.open_issues_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </td>
      </tr>
      </tbody>
    </table>

  )
};

RepositorySummaryDetails.propTypes = {
  repository: PropTypes.object.isRequired,
};

export default RepositorySummaryDetails;