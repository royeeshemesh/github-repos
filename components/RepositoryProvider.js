import React, {Component} from 'react'

/* First we will make a new context */
const RepositoryContext = React.createContext({
  repository: null
});

/* Then create a provider Component */
class RepositoryProvider extends Component {
  state = {
    repository: null
  };

  set = repo => {
    this.setState({
      repository: repo
    })
  };

  render() {
    return (
      <RepositoryContext.Provider
        value={{
          repository: this.state.repository,
          set: this.set,
        }}
      >
        {this.props.children}
      </RepositoryContext.Provider>
    )
  }
}

/* then make a consumer which will surface it */
const RepositoryConsumer = RepositoryContext.Consumer;

export {RepositoryContext};
export {RepositoryConsumer};
export default RepositoryProvider;
