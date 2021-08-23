import React from 'react';
import $ from 'jquery';
import placeholder from './eachComponent/placeholderData.js';
import helpers from '.././ratingsReviews/ReviewsHelperFunc.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.productId,
      hardcodedIds: [
        {key: 36300, value: 'fifth'},
        {key: 36302, value: 'first'},
        {key: 36304, value: 'second'},
        {key: 36307, value: 'third'},
        {key: 36309, value: 'fourth'}
      ]
    };
  }


  changeMainProductId(event) {
    const allKeys = [
      {key: 36300, value: 'fifth'},
      {key: 36302, value: 'first'},
      {key: 36304, value: 'second'},
      {key: 36307, value: 'third'},
      {key: 36309, value: 'fourth'}
    ];
    let newId = event.currentTarget.id;
    let newArray = [];
    for (let i = 0; i < allKeys.length; i++) {
      if (allKeys[i].key !== parseInt(newId)) {
        newArray.push(allKeys[i]);
      }
    }
    this.setState({
      hardcodedIds: newArray,
    }, () => {
      this.props.changeMainProductId(newId);

    });
  }

  render() {

    let relatedProductDivs = this.state.hardcodedIds.map((item, index) => {
      if (item.key !== this.props.productId) {
        return (
          <div key={index} className='firstRelated' id={item.key} onClick={this.changeMainProductId.bind(this)}>
            <div className='relatedProductsStar'>✭</div>
            <img src={placeholder[item.value].pic} alt='related product' className='relatedProductsPic'/>
            <div className='relatedProductsInfo'>
              {placeholder[item.value].category}
              <br></br>
              <b>{placeholder[item.value].name}</b>
              <br></br>
              {placeholder[item.value].price}
              {helpers.calculateStarDiv(this.props.avgRating, 'test key')}
            </div>
          </div>
        );
      }
    });

    return (
      <div className='relatedProducts'>
        <div className='relatedProductsTitle'>RELATED PRODUCTS</div>
        <div className='relatedProductsArrow'>←</div>
        {relatedProductDivs}
        <div className='relatedProductsArrow'>→</div>
      </div>

    );
  }
}
export default RelatedProducts;