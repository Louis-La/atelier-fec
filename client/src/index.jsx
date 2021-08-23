import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/ratingsReviews/ratings.jsx';
import SearchBar from './components/questionsAnswers/searchBar.jsx';
import QuestionsAnswersState from './components/questionsAnswers/QuestionAnswerState.jsx';
import ProductOverview from './components/productDetails/OverviewMain.jsx';
import { ProductMainStateProvider } from './components/questionsAnswers/productState.jsx';
import TopSearchBar from './components/TopSearchBar.jsx';
import RelatedProducts from './components/relatedItems/related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 36300,
      user: '',
      stars: '',
      reportedArray: [],
      avgRating: 0,
      productName: '',
      numberOfReviews:0
    };
    this.search = this.search.bind(this);
    this.updateAvgRatingForProduct = this.updateAvgRatingForProduct.bind(this);
    this.getProductName = this.getProductName.bind(this);
    this.getNumberOfReviews = this.getNumberOfReviews.bind(this);
  }
  getNumberOfReviews(num) {
    this.setState( {numberOfReviews: num} );
  }
  //handles updating avg rating for a product
  updateAvgRatingForProduct(rating) {
    this.setState({ avgRating: rating });
  }
  search(term) {
    this.setState({
      productId: parseInt(term)
    });
  }
  //handles setting the state for product name
  getProductName(name) {
    this.setState({productName: name});
  }

  changeMainProductId(clickedProductId) {
    this.setState({
      productId: clickedProductId,
    });
  }

  toggleDark() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  }

  render() {
    return (
      <div className="App-container">
        <ProductMainStateProvider productId ={this.state.productId}>
          <TopSearchBar onSearch={this.search} toggleDark={this.toggleDark}/>
          <ProductOverview numberOfReviews={this.state.numberOfReviews} productId={this.state.productId} avgRating = {this.state.avgRating} getProductName = {this.getProductName}/>
          <RelatedProducts changeMainProductId={this.changeMainProductId.bind(this)} productId={this.state.productId} avgRating = {this.state.avgRating}/>
          <QuestionsAnswersState
            productId={this.state.productId}
          />
          <Reviews props={this.state} productId={this.state.productId} avgRatingFunc = {this.updateAvgRatingForProduct} getNumOfReviews = {this.getNumberOfReviews}/>
        </ProductMainStateProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
