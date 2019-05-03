import React, {Fragment} from 'react'
import Link from 'next/link'
import RepositorySummaryDetails from 'components/RepositorySummaryDetails';

import {RepositoryConsumer, RepositoryContext} from 'components/RepositoryProvider';
import RepositoryTopContributors from "components/RepositoryTopContributors";

export default class Preact extends React.Component {
  static async getInitialProps(context) {
    // eslint-disable-next-line no-undef
    // const res = await fetch('https://api.github.com/search/repositories?q=angular&sort=stars&order=desc&per_page=10');
    // const result = await res.json();
    const {id} = context.query;
    return {
      repositoryId: id
    }
  }

  componentDidMount() {
    // console.info(this.props.result);

  }

  fetchRepository = () => {
  };

  render() {

    return (
      <div>
        <Link prefetch href='/'>
          <a className="btn btn-primary">Back to search</a>
        </Link>

        <RepositoryConsumer>
          {({repository}) => {
            if (!repository) {
              return null;
            }

            return (
              <Fragment>
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

              </Fragment>
            )
          }}
        </RepositoryConsumer>
      </div>

    )
  }
}
