import React, {Fragment} from 'react'
import Link from 'next/link'
import RepositorySummaryDetails from '___components/RepositorySummaryDetails';

import {RepositoryConsumer} from '___components/RepositoryProvider';
import RepositoryTopContributors from "___components/RepositoryTopContributors";

class Summary extends React.Component {
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

export default Summary;