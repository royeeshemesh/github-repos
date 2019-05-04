import React, {Component} from 'react'
import RepositoryTopContributors from "src/components/RepositoryTopContributors";
import RepositorySummaryDetails from "src/components/RepositorySummaryDetails";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

class Summary extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.info(nextProps.repositoryToShow);
    if (!nextProps.repositoryToShow) {
      nextProps.history.push('/');
      return false;
    }

    return true;
  }

  render() {
    const {repositoryToShow: repository, history} = this.props;

    if (!repository) {
      history.push('/');
      return null;
    }


    return (
      <div>
        <Link to='/'>
          <button className="btn btn-primary">Back to search</button>
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
)(withRouter(Summary))