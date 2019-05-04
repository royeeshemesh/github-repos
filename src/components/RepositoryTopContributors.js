import React, {Component, Fragment} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class RepositoryTopContributors extends Component {
  state = {
    fetching: true,
    contributors: [],
  };

  async componentDidMount() {
    const {repository} = this.props;
    const {data} = await axios.get(repository.contributors_url);
    this.setState({
      fetching: false,
      contributors: data ? data.slice(0, 5) : [],
    });
  }

  render() {
    const {contributors, fetching} = this.state;

    if (fetching) {
      return (
        <Fragment>
          <div className="loader" id="loader">
            <span/>
            <span/>
            <span/>
          </div>
        </Fragment>
      );
    }

    if (contributors && !contributors.length) {
      return (
        <div>No contributors for this repository</div>
      )
    }

    const contributorsRows = contributors.map(contributor => {
      return (
        <tr key={contributor.login}>
          <td>
            <img
              src={contributor.avatar_url}
              alt="contributor avatar"
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <a target="_blank" href={contributor.html_url} rel="noopener noreferrer">{contributor.login}</a>
          </td>
          <td>{contributor.contributions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        </tr>
      )
    });

    return (

      <table className="summary-table contributors-table">
        <thead>
        <tr>
          <th>User</th>
          <th>Contributions</th>
        </tr>
        </thead>
        <tbody>
        {contributorsRows}
        </tbody>
      </table>
    )
  };
}

RepositoryTopContributors.propTypes = {
  repository: PropTypes.object.isRequired,
};

export default RepositoryTopContributors;