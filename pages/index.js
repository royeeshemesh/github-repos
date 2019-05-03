import React, {Component} from 'react'
import Router, {withRouter} from 'next/router';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import GithubRepositoryItem from 'components/GithubRepositoryItem';
import axios from 'axios';

import {RepositoryConsumer} from 'components/RepositoryProvider';

const CancelToken = axios.CancelToken;
let source;

const REPOSITORIES_SEARCH_URI = 'https://api.github.com/search/repositories';

class Index extends Component {
  state = {
    allowNew: false,
    isLoading: false,
    multiple: false,
    result: {},
    isHighlightMatchesOn: false,
    perPage: 10,
  };

  componentDidMount() {
    this.props.router.prefetch('/summary');
  }

  handleInputChange = text => {
    clearTimeout(this.timeout);

    if (!text || text.length < 3) {
      if (source) {
        source.cancel();
      }

      this.setState({isLoading: false, result: {}});

      return;
    }

    this.timeout = setTimeout(this.handleSearch, 350, text);
  };

  handleSearch = async query => {
    this.setState({isLoading: true});

    if (source) {
      source.cancel();
    }

    source = CancelToken.source();

    try {
      const {data} = await axios.get(`${REPOSITORIES_SEARCH_URI}?q=${query} in:name&per_page=10`, {
        cancelToken: source.token
      });

      this.setState({
        isLoading: false,
        result: data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const {result, isLoading, isHighlightMatchesOn} = this.state;
    const {items: options} = result;
    return (
      <RepositoryConsumer>

        {({set}) => {
          return (
            <div className="row">
              <div className="col-md-6">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value={isHighlightMatchesOn} onChange={() => this.setState({isHighlightMatchesOn: !isHighlightMatchesOn})}/> Highlight matches
                  </label>
                </div>
                <AsyncTypeahead
                  id="repo-typeahead"
                  bsSize="large"
                  isLoading={isLoading}
                  options={options}
                  labelKey="name"
                  onInputChange={this.handleInputChange}
                  onChange={repo => {
                    set(repo[0]);
                    Router.push(`/summary?id=${repo[0].id}`);
                  }}
                  onSearch={() => {
                  }}
                  placeholder="Search for a Github repository..."
                  renderMenuItemChildren={(option, props) => (
                    <GithubRepositoryItem
                      highlightMatches={isHighlightMatchesOn}
                      key={option.id}
                      repository={option}
                      optionsProps={props}/>
                  )}
                />
              </div>
            </div>
          )
        }}


      </RepositoryConsumer>
    )
  }
}

export default withRouter(Index);