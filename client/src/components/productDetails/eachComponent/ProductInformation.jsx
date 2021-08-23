import React from 'react';
import $ from 'jquery';
import helpers from '../../ratingsReviews/ReviewsHelperFunc.jsx';
import saveClickedInteraction from './UserClickInteractions.jsx';

class ProductInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  moveToReviews() {
    document.getElementById('reviews').scrollIntoView();
    saveClickedInteraction('Read All Reviews div', 'Product Information - Product Overview');
  }

  render() {

    let displayPrice;
    if (this.props.allResultsArray[this.props.currentStyleIndex]) {
      if (this.props.allResultsArray[this.props.currentStyleIndex].sale_price) {
        displayPrice = <div><del>$ {this.props.allResultsArray[this.props.currentStyleIndex].original_price}</del><span className='salePrice'> $ {this.props.allResultsArray[this.props.currentStyleIndex].sale_price}</span></div>;
      } else {
        displayPrice = <div>$ {this.props.allResultsArray[this.props.currentStyleIndex].original_price}</div>;
      }
    }

    let ratings;
    if (this.props.avgRating > 0) {
      ratings =
        <div onClick={this.moveToReviews.bind(this)} className='readAllReviews'>
          <div>{helpers.calculateStarDiv(this.props.avgRating, 'test key')}</div>
          <div className='extraSpace'></div>
          <div><u>Read all [<b>{this.props.numberOfReviews}</b>] review(s)</u></div>
        </div>;
    }

    return (
      <div className='productInformation'>
        {ratings}
        <div className='categoryName'>{this.props.productInfo.category}</div>
        <div className='productName'><b>{this.props.productInfo.name.toUpperCase()}</b></div>
        <div className='priceTag'>{displayPrice}</div>
      </div>
    );
  }
}

export default ProductInformation;
