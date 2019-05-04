import React from 'react'
import App, {Container} from 'next/app'

import RepositoryProvider from '___components/RepositoryProvider';

class GithubRepositoriesApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;

    return (
      <Container>
        <RepositoryProvider>
          <div className="container">
            <div className="jumbotron">
              <h1>GitHub repositories search</h1>
              <p>This is a sample app to demonstrate v3 GitHub api for searching repositories</p>
              <small>By Royee Shemesh</small>
              <hr/>
              <Component {...pageProps} />
            </div>
          </div>
        </RepositoryProvider>
      </Container>
    )
  }
}

export default GithubRepositoriesApp;