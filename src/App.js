import React, {Component, Fragment} from 'react';
import './App.css';
import './components/components.css';
import Summary from 'src/summary/Summary';
import Search from 'src/search/Search';

class GithubRepositoriesApp extends Component {
  state = {
    repositoryToShow: null
  };

  onSelectRepository = repositoryToShow => {
    this.setState({
      repositoryToShow
    });
  };

  onBackToSearch = () => {
    this.setState({
      repositoryToShow: null
    });
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="jumbotron">
            <h1>GitHub repositories search</h1>
            <p>This is a sample app to demonstrate v3 GitHub api for searching repositories</p>
            <small>By Royee Shemesh</small>
            <hr/>

            {!this.state.repositoryToShow && <Search onSelectRepository={this.onSelectRepository}/>}
            {this.state.repositoryToShow && <Summary repositoryToShow={this.state.repositoryToShow} onBackToSearch={this.onBackToSearch}/>}

          </div>
        </div>
      </Fragment>
    );
  }
}

export default GithubRepositoriesApp;
