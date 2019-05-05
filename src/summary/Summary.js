import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RepositoryTopContributors from "src/components/RepositoryTopContributors";
import RepositorySummaryDetails from "src/components/RepositorySummaryDetails";

class Summary extends Component {

  render() {
    const {repositoryToShow: repository} = this.props;

    return (
      <div>
        <button className="btn btn-primary" onClick={this.props.onBackToSearch}>Back to search</button>
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

Summary.propTypes = {
  repositoryToShow: PropTypes.object.isRequired,
  onBackToSearch: PropTypes.func.isRequired,
};

export default Summary;

// const mapStateToProps = state => ({ repositoryToShow: state.repositories.repositoryToShow });
//
// export default connect(
//   mapStateToProps,
//   null
// )(withRouter(Summary))