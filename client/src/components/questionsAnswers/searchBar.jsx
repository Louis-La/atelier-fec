import React from 'react';
import interact from './Interaction.jsx';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value,
    }, () => {
      this.search(e);
    });
  }

  search(e) {
    e.preventDefault();
    let searchTerm = this.state.searchTerm;
    this.props.onSearch(searchTerm);

  }

  render() {
    return (
      <div>
        <div className="searchbar">
          <form>
            <p className="searchbartitle">QUESTIONS & ANSWERS
              <br />
              <input
                onChange={this.onChange}
                onClick={() => {interact('input', 'searchBarClicked')}}
                className="searchfield search largefont"
                placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ...... 🔍"
              />
            </p>
          </form>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default SearchBar;