import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import placeholder from './eachComponent/placeholderData.js';
import ProductDescription from './eachComponent/ProductDescription.jsx';
import ProductInformation from './eachComponent/ProductInformation.jsx';
import StyleSelector from './eachComponent/StyleSelector.jsx';
import Carousel from './eachComponent/Carousel.jsx';
import AddToCart from './eachComponent/AddToCart.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: placeholder.productInfo,
      currentSelectedStyleId: 162332,
      fullSizePhotos: placeholder.fullSizePhotos,
      smallSizePhotos: placeholder.smallSizePhotos,
      styleNames: placeholder.styleNames,
      thumbnails: placeholder.thumbnails,
      styleIds: placeholder.styleIds,
      skuIds: placeholder.skuIds,
      skuCounts: placeholder.skuCounts,
      currentSize: placeholder.currentSize,
      currentQuantity: placeholder.currentQuantity,
      currentMainThumbnail: 5,
      currentStyleIndex: 0,
      allResultsArray: [],
      currentCheckMarked: 0,
      productIdNumber: props.productId,

    };
    this.getDataFromProductId = this.getDataFromProductId.bind(this);
    this.getDataFromProductIdOnDidUpdate = this.getDataFromProductIdOnDidUpdate.bind(this);
    this.getDataFromProductIdOnDidUpdate = this.getDataFromProductIdOnDidUpdate.bind(this);
    this.getDataFromStyleId = this.getDataFromStyleId.bind(this);
    this.changeMainPageStyle = this.changeMainPageStyle.bind(this);
    this.renderPhotosOnClick = this.renderPhotosOnClick.bind(this);
    this.renderQuantity = this.renderQuantity.bind(this);
  }

  componentDidMount() {
    this.getDataFromProductId(this.state.productIdNumber);
  }

  componentDidUpdate() {
    if (this.state.productIdNumber !== this.props.productId) {

      this.setState({
        productIdNumber: this.props.productId,
        currentStyleIndex: 0,
      }, () => {
        this.getDataFromProductIdOnDidUpdate(this.state.productIdNumber);
      });
    }
  }

  getDataFromProductId(productId) {
    axios({
      method: 'post',
      url: '/productdetails',
      data: { id: productId },
    })
      .then((response) => {
        this.props.getProductName(response.data.name);

        this.setState({
          productInfo: response.data,
          features: response.data.features,
        }, () => {
          this.getDataFromStyleId(this.state.productIdNumber);
        });
      })
      .catch((error) => {
        console.log('Error in getting data from getDataFromProductId', error);
      });
  }

  getDataFromProductIdOnDidUpdate(productId) {
    axios({
      method: 'post',
      url: '/productdetails',
      data: { id: productId },
    })
      .then((response) => {
        this.props.getProductName(response.data.name);

        let thumbnails = document.getElementsByClassName('imageThumb');
        for (let i = 0; i < thumbnails.length; i++) {
          document.getElementsByClassName('imageThumb')[i].classList.remove('selectedThumbnail');
        }

        if (document.getElementById('selectedSize')) {
          document.getElementById('selectedSize').selectedIndex = 0;
          if (document.getElementById('selectedQuantity').selectedIndex) {
            document.getElementById('selectedQuantity').selectedIndex = 0;
          }
          const tooltip = document.getElementsByClassName('tooltiptext')[0];
          tooltip.style.visibility = 'hidden';
        }

        this.setState({
          productInfo: response.data,
          features: response.data.features,
        }, () => {
          this.getDataFromStyleIdUpdate(this.state.productIdNumber);
        });
      })
      .catch((error) => {
        console.log('Error in getting data from getDataFromProductId', error);
      });
  }

  getDataFromStyleIdUpdate(productId) {
    axios({
      method: 'get',
      url: `/product/styles?pid=${productId}`,
    })
      .then((response) => {
        const styleId = response.data.results[0].style_id;
        // console.log(response.data.results)
        // Extract photo links here ========================
        const fullPhotos = [];
        const smallPhotos = [];
        for (let i = 0; i < response.data.results.length; i++) {
          if (response.data.results[i].style_id === styleId) {
            for (let j = 0; j < response.data.results[i].photos.length; j++) {
              fullPhotos.push(response.data.results[i].photos[j].url);
              smallPhotos.push(response.data.results[i].photos[j].thumbnail_url);
            }
          }
        }

        // Getting style names, thumbnails, and skus ============
        const names = response.data.results.map((item) => ( item.name ));
        const thumbnails = response.data.results.map((item) => (
          item.photos[0].thumbnail_url
        ));
        const styleIds = response.data.results.map((item) => ( item.style_id ));
        const skusObject = response.data.results[0].skus;
        let skuIds = [];
        let skuCounts = [];
        for (let key in skusObject) {
          skuIds.push(key);
          skuCounts.push(skusObject[key]);
        }

        // ==================================================
        return [fullPhotos, smallPhotos, names, thumbnails, skuIds, skuCounts, styleIds, skuCounts[0].quantity, smallPhotos[0].slice(34, 85), response.data.results, smallPhotos[0].slice(34, 90)];
      })
      .then((result) => {
        this.setState({
          fullSizePhotos: result[0],
          smallSizePhotos: result[1],
          styleNames: result[2],
          thumbnails: result[3],
          skuIds: result[4],
          skuCounts: result[5],
          styleIds: result[6],
          currentQuantity: result[7],
          currentMainThumbnail: result[8],
          allResultsArray: result[9],
          currentCheckMarked: result[10],
        }, () => {
          if (this.state.currentQuantity !== 'null') {
            const tooltip = document.getElementsByClassName('cartButton')[0];
            tooltip.style.visibility = 'hidden';
          }
          if (this.state.currentQuantity > 0) {
            const tooltip = document.getElementsByClassName('cartButton')[0];
            tooltip.style.visibility = 'visible';
          }
          document.getElementsByClassName(this.state.currentMainThumbnail)[0].classList.add('clickedMarker');
          document.getElementsByClassName(this.state.currentCheckMarked)[0].classList.add('checkMark');
          document.getElementsByClassName('imageThumb')[0].classList.add('selectedThumbnail');
        });
      })
      .catch((error) => {
        console.log('Error in getting data from ProductID Styles, getDataFromStyleId', error);
      });
  }

  getDataFromStyleId(productId) {
    axios({
      method: 'get',
      url: `/product/styles?pid=${productId}`,
    })
      .then((response) => {
        const styleId = response.data.results[0].style_id;
        // console.log(response.data.results)
        // Extract photo links here ========================
        const fullPhotos = [];
        const smallPhotos = [];
        for (let i = 0; i < response.data.results.length; i++) {
          if (response.data.results[i].style_id === styleId) {
            for (let j = 0; j < response.data.results[i].photos.length; j++) {
              fullPhotos.push(response.data.results[i].photos[j].url);
              smallPhotos.push(response.data.results[i].photos[j].thumbnail_url);
            }
          }
        }

        // Getting style names, thumbnails, and skus ============
        const names = response.data.results.map((item) => ( item.name ));
        const thumbnails = response.data.results.map((item) => (
          item.photos[0].thumbnail_url
        ));
        const styleIds = response.data.results.map((item) => ( item.style_id ));
        const skusObject = response.data.results[0].skus;
        let skuIds = [];
        let skuCounts = [];
        for (let key in skusObject) {
          skuIds.push(key);
          skuCounts.push(skusObject[key]);
        }

        // ==================================================
        return [fullPhotos, smallPhotos, names, thumbnails, skuIds, skuCounts, styleIds, skuCounts[0].quantity, smallPhotos[0].slice(34, 85), response.data.results, smallPhotos[0].slice(34, 90)];
      })
      .then((result) => {
        this.setState({
          fullSizePhotos: result[0],
          smallSizePhotos: result[1],
          styleNames: result[2],
          thumbnails: result[3],
          skuIds: result[4],
          skuCounts: result[5],
          styleIds: result[6],
          currentQuantity: result[7],
          currentMainThumbnail: result[8],
          allResultsArray: result[9],
          currentCheckMarked: result[10],
        }, () => {
          document.getElementsByClassName(this.state.currentMainThumbnail)[0].classList.add('clickedMarker');
          document.getElementsByClassName(this.state.currentCheckMarked)[0].classList.add('checkMark');
          document.getElementsByClassName('imageThumb')[0].classList.add('selectedThumbnail');
        });
      })
      .catch((error) => {
        console.log('Error in getting data from ProductID Styles, getDataFromStyleId', error);
      });
  }

  renderPhotosOnClick(productId, styleId) {
    axios({
      method: 'get',
      url: `/product/styles?pid=${productId}`,
    })
      .then((response) => {
        // Update photos array =============================
        const fullPhotos = [];
        const smallPhotos = [];
        for (let i = 0; i < response.data.results.length; i++) {
          if (response.data.results[i].style_id === styleId) {
            for (let j = 0; j < response.data.results[i].photos.length; j++) {
              fullPhotos.push(response.data.results[i].photos[j].url);
              smallPhotos.push(response.data.results[i].photos[j].thumbnail_url);
            }
          }
        }
        return [fullPhotos, smallPhotos];
      })
      .then((result) => {
        this.setState({
          fullSizePhotos: result[0],
          smallSizePhotos: result[1],
        });
      })
      .catch((error) => {
        console.log('Error in updating photos array after clicking different style', error);
      });
  }

  changeMainPageStyle(passInStyleId) {
    this.setState({
      currentSelectedStyleId: passInStyleId,
    }, () => {
      this.renderPhotosOnClick(this.state.productIdNumber, this.state.currentSelectedStyleId);
    });
  }

  changeStyleId(index, clickedClass, checkMark) {
    let currentStyleIndex = index;
    let currentStyle = this.state.currentMainThumbnail;
    let newStyle = clickedClass;
    let newCheckMark = checkMark;
    let currentCheckMark = this.state.currentCheckMarked;

    axios({
      method: 'get',
      url: `/product/styles?pid=${this.state.productIdNumber}`,
    })
      .then((response) => {
        // Update SKUs and StyleId
        let skusObject = response.data.results[currentStyleIndex].skus;
        let skuIds = [];
        let skuCounts = [];
        for (let key in skusObject) {
          skuIds.push(key);
          skuCounts.push(skusObject[key]);
        }
        this.setState({
          skuIds: skuIds,
          skuCounts: skuCounts,
          currentStyleIndex: currentStyleIndex,
          currentMainThumbnail: newStyle,
          currentCheckMarked: newCheckMark,
        }, () => {
          this.changeMainPageStyle(response.data.results[currentStyleIndex].style_id);
          document.getElementsByClassName(currentStyle)[0].classList.remove('clickedMarker');
          document.getElementsByClassName(currentCheckMark)[0].classList.remove('checkMark');
          document.getElementsByClassName(newCheckMark)[0].classList.add('checkMark');
          document.getElementsByClassName(this.state.currentMainThumbnail)[0].classList.add('clickedMarker');

          // reset size and quantity to default
          if (document.getElementById('selectedSize')) {
            document.getElementById('selectedSize').selectedIndex = 0;
            if (document.getElementById('selectedQuantity')) {
              document.getElementById('selectedQuantity').selectedIndex = 0;
            }

            const tooltip = document.getElementsByClassName('tooltiptext')[0];
            tooltip.style.visibility = 'hidden';
          }
        });
      })
      .catch((error) => {
        console.log('Error in changing StyleID', error);
      });
  }

  renderQuantity(size) {
    const currentSize = size;
    let totalQuantity;
    for (let i = 0; i < this.state.skuCounts.length; i++) {
      if (this.state.skuCounts[i].size === currentSize) {
        totalQuantity = this.state.skuCounts[i].quantity;
      }
    }
    this.setState({
      currentSize: currentSize,
      currentQuantity: totalQuantity,
    });
  }

  onChangeId() {
    this.props.random(() => {
      this.getDataFromProductId(this.state.productIdNumber);
    });
  }

  onAddToCart(skuId, size, quantity, cb) {
    $.ajax({
      method: 'POST',
      url: '/addToCart',
      data: { sku_id: skuId, count: quantity, size: size },
      success: () => {
        console.log('🛒 ', quantity + 'x - Size: ' + size + ' -', this.state.styleNames[this.state.currentStyleIndex], '| ' + this.state.productInfo.name, 'added to the shopping cart!');
        document.getElementById('selectedSize').selectedIndex = 0;
        document.getElementById('selectedQuantity').selectedIndex = 0;
        cb();
      },
      error: (error) => {
        console.log('Failed to add to cart', error);
      },
    });
  }

  render() {
    return (
      <div className='products overviewContainer'>

        <Carousel fullSizePhotos={this.state.fullSizePhotos} smallSizePhotos={this.state.smallSizePhotos} currentMainThumbnail={this.state.currentMainThumbnail} productId={this.props.productId}/>

        <div className='selectorContainer'>
          <ProductInformation numberOfReviews={this.props.numberOfReviews} productInfo={this.state.productInfo} allResultsArray={this.state.allResultsArray} currentStyleIndex={this.state.currentStyleIndex} avgRating = {this.props.avgRating}/>
          <StyleSelector styleNames={this.state.styleNames} thumbnails={this.state.thumbnails} styleIds={this.state.styleIds} currentStyleIndex={this.state.currentStyleIndex} changeStyleId={this.changeStyleId.bind(this)} />
          <AddToCart productId={this.props.productId} styleNames={this.state.styleNames} currentStyleIndex={this.state.currentStyleIndex} currentQuantity={this.state.currentQuantity} skuIds={this.state.skuIds} skuCounts={this.state.skuCounts} renderQuantity={this.renderQuantity.bind(this)} onAddToCart={this.onAddToCart.bind(this)} />
        </div>

        {/* <button onClick={this.onChangeId.bind(this)}>Randomize Product ID</button> */}
        <ProductDescription productInfo={this.state.productInfo} />

      </div>
    );
  }
}

export default ProductOverview;
