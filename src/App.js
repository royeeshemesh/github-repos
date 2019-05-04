import React, {Component} from 'react';
import './App.css';
import './components/components.css';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Summary from 'src/summary/Summary';
import Search from 'src/search/Search';
import RepositoriesReducer from 'store/repositories/reducer';

const reducers = {
  repositories: RepositoriesReducer,
};

const store = createStore(
  combineReducers(reducers),
  {},
);

class GithubRepositoriesApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <header className="app-header">
          </header>

          <div className="container">
            <div className="jumbotron">
              <h1>GitHub repositories search</h1>
              <p>This is a sample app to demonstrate v3 GitHub api for searching repositories</p>
              <small>By Royee Shemesh</small>
              <hr/>
              <Route exact path="/" component={Search}/>
              <Route exact path="/summary" component={Summary}/>
            </div>
          </div>

        </Router>
      </Provider>
    );
  }
}

export default GithubRepositoriesApp;
