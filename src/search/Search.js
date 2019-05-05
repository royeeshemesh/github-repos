import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import GithubRepositoryItem from 'src/components/GithubRepositoryItem';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let source;

const REPOSITORIES_SEARCH_URI = 'https://api.github.com/search/repositories';


export class Search extends Component {
  state = {
    isLoading: false,
    result: {},
    isHighlightMatchesOn: false,
    perPage: 10,
  };

  componentDidMount() {
    // this.props.router.prefetch('/summary');
  }

  handleInputChange = text => {
    clearTimeout(this.timeout);

    if (!text || text.length < 3) {
      if (source) {
        source.cancel();
      }

      return this.setState({isLoading: false, result: {}});
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

  handleOnChange = selected => {
    const [repository] = selected;
    this.props.onSelectRepository(repository);
  };

  render() {
    const {result, isLoading, isHighlightMatchesOn} = this.state;
    const {items: options} = result;
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
            onChange={this.handleOnChange}
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
  }
}

Search.propTypes = {
  onSelectRepository: PropTypes.func.isRequired,
};

export default Search;


// const mapDispatchToProps = {onSelectRepository};
// export default connect(
//   null,
//   mapDispatchToProps
// )(withRouter(Search))