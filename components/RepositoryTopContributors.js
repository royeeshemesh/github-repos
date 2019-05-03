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
          {/*language=CSS*/}
          <style jsx>{`
            #loader span {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 100%;
              background-color: darkgray;
              margin: 5px 5px;
              opacity: 0;
            }

            #loader span:nth-child(1) {
              animation: opacitychange 1s ease-in-out infinite;
            }

            #loader span:nth-child(2) {
              animation: opacitychange 1s ease-in-out 0.33s infinite;
            }

            #loader span:nth-child(3) {
              animation: opacitychange 1s ease-in-out 0.66s infinite;
            }

            @keyframes opacitychange {
              0%, 100% {
                opacity: 0;
              }

              60% {
                opacity: 1;
              }
            }

          `}</style>

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
          {/*language=CSS*/}
          <style jsx>{`

            tr {
              border-top: 1px solid lightgray;
            }

            tr td {
              padding: 10px 15px;
            }

            tr td:first-child {
              vertical-align: top;
              padding-left: 0;
              white-space: nowrap;
            }

            tr td:last-child {
              text-align: right;
              padding-right: 0;
            }
          `}</style>
          <td>
            <img
              src={contributor.avatar_url}
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <a target="_blank" href={contributor.html_url}>{contributor.login}</a>
          </td>
          <td>{contributor.contributions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        </tr>
      )
    });

    return (

      <table>
        {/*language=CSS*/}
        <style jsx>{`

          table {
            width: 100%;
          }
        `}</style>
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