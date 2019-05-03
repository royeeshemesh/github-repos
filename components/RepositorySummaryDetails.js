import React from 'react';

const RepositorySummaryDetails = props => {
  const {repository} = props;
  const {owner} = repository;

  return (
    <table>
      {/*language=CSS*/}
      <style jsx>{`

        table {
          width: 100%;
        }

        table tr:not(:first-child) {
          border-top: 1px solid lightgray;
        }

        table tr td {
          padding: 10px 15px;
        }

        table tr td:first-child {
          vertical-align: top;
          padding-left: 0;
          white-space: nowrap;
        }

        table tr td:last-child {
          padding-right: 0;
        }

      `}</style>


      <tbody>
      <tr>
        <td>
          <b>Name: </b>
        </td>
        <td>
          <a target="_blank" href={repository.html_url}>{repository.name} </a>

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
          <a href={repository.homepage} target="_blank">{repository.homepage}</a>
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

export default RepositorySummaryDetails;