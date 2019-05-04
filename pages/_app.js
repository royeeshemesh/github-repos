import React from 'react';
import App, {Container} from 'next/app';
import { Provider } from 'react-redux';
import WithReduxStore from 'lib/WithReduxStore';

class GithubRepositoriesApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <div className="container">
            <div className="jumbotron">
              <h1>GitHub repositories search</h1>
              <p>This is a sample app to demonstrate v3 GitHub api for searching repositories</p>
              <small>By Royee Shemesh</small>
              <hr/>
              <Component {...pageProps} />
            </div>
          </div>
        </Provider>
      </Container>
    )
  }
}

export default WithReduxStore(GithubRepositoriesApp);