import React from 'react';

class TopSearchBar extends React.Component {
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
    });
  }

  search(e) {
    console.log('search clicked')
    e.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="logoAndNavigationContainer">
        <div className='navigationBar'>

          <div className='navigation navigation1'>
            <p className='logoSize'><a href="https://github.com/FEC-Manchego/Atelier">🧀 Manchego</a></p>
            {/* <p><a href="/">❀ Atelier</a></p> */}
            {/* <p><a href="/">⎋ Atelier</a></p> */}
          </div>

          <div className='navigation navigation2'>
            <form>
              <input
                value={this.state.searchTerm}
                onChange={this.onChange}
                className="topsearchbar"
                placeholder="Enter Product Id "
              ></input>
            </form>
            <svg onClick={this.search} className='productIdSearchButton' id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><g id="icon_x5F_function"><path id="icn_x5F_search_x5F_forms_1_" d="M18.7 17.3l-5.1-5.1C14.5 11 15 9.6 15 8c0-3.9-3.1-7-7-7S1 4.1 1 8s3.1 7 7 7c1.6 0 3-.5 4.2-1.4l5.1 5.1c.2.2.5.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4M3 8c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5"/></g></svg>
            <span className='toggleDarkMode' onClick={this.props.toggleDark.bind(this)}>🌓</span>
          </div>
        </div>
        <div className='announce'>
          <p><i>SIDE-WIDE ANNOUNCEMENT MESSAGE!</i> - SALE / DISCOUNT <b>OFFER</b> - <u>NEW PRODUCT HIGHLIGHT</u></p>
        </div>

      </div>
    );
  }
}

export default TopSearchBar;





// import React from 'react';

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchTerm: '',
//     };
//     this.search = this.search.bind(this);
//     this.onChange = this.onChange.bind(this);
//   }

//   onChange(e) {
//     this.setState({
//       searchTerm: e.target.value,
//     }, () => {
//       this.search(e);
//     });
//   }

//   search(e) {
//     e.preventDefault();
//     let searchTerm = this.state.searchTerm;
//     this.props.onSearch(searchTerm);

//   };

