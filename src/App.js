import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <header className="app-header">
        </header>

        <div>
          <Route exact path="/" component={Search} />
          <Route exact path="/summary" component={Summary} />
        </div>

      </Router>
    );
  }
}

export default App;
