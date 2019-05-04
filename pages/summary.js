import React, {Component} from 'react'
import Link from 'next/link'
import RepositoryTopContributors from "src/components/RepositoryTopContributors";
import RepositorySummaryDetails from "src/components/RepositorySummaryDetails";
import { connect } from 'react-redux';

class Summary extends Component {
  static async getInitialProps(context) {

    if (context.res) {
      context.res.writeHead(302, {
        Location: '/'
      });
      return context.res.end();
    }
    return {}
  }

  render() {
    const {repositoryToShow: repository} = this.props;

    return (
      <div>
        <Link prefetch href='/'>
          <a className="btn btn-primary">Back to search</a>
        </Link>
        <div className="row">
          <div className="col-md-8">
            <h3>Repository summary:</h3>

            <RepositorySummaryDetails repository={repository}/>
          </div>

          <div className="col-md-4">
            <h3>Top contributors:</h3>

            <RepositoryTopContributors repository={repository}/>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({ repositoryToShow: state.repositories.repositoryToShow });

export default connect(
  mapStateToProps,
  null
)(Summary)