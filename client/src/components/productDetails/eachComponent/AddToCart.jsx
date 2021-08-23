import React from 'react';
import saveClickedInteraction from './UserClickInteractions.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantitySelected: false,
      rerenderSize: false,
      productIdNumber: props.productId,
    };
    this.openSuccessModal = this.openSuccessModal.bind(this);
  }


  componentDidUpdate() {
    if (this.state.productIdNumber !== this.props.productId) {
      this.setState({
        productIdNumber: this.props.productId,
        rerenderSize: true,
      });
    }
  }

  renderQuantity(event) {
    saveClickedInteraction('Size Select', 'Add to Cart - Product Overview');
    this.props.renderQuantity(event.currentTarget.value);
    const tooltip = document.getElementsByClassName('tooltiptext')[0];
    tooltip.style.visibility = 'hidden';
  }

  closeModal() {
    let modal = document.getElementById('myCartModal');
    modal.style.display = 'none';
  }

  openSuccessModal(productName, style, size, quantity) {
    let itemsAdded = '✓ ' + quantity + 'x ' + 'Size: ' + size + ' | ' + productName + ' - ' + style;
    document.getElementsByClassName('cartInnerText')[0].innerText = itemsAdded;

    let modal = document.getElementById('myCartModal');

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName('closeCartModal')[0];

    // When the user clicks on the button, open the modal
    modal.style.display = 'block';

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

  }

  addToCart() {
    saveClickedInteraction('Add to cart button', 'Add to Cart - Product Overview');
    // OpenSelectMenu is a function that will open the size select menu if 'Add to bag' has been clicked but no size is selected
    const OpenSelectMenu = (element, maxSize) => {
      const preventDefault = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      let isOpen = false;

      const open = function() {
        if (!isOpen) {
          element.size = maxSize;
          element.removeEventListener('mousedown', preventDefault);
          element.focus();
          isOpen = true;
        }
      };

      const close = () => {
        if (isOpen) {
          element.size = 1;
          element.addEventListener('mousedown', preventDefault);
          isOpen = false;
        }
      };
      element.addEventListener('mousedown', preventDefault);
      element.addEventListener('blur', close);
      element.addEventListener('click', () => {
        if (isOpen) {
          close();
        } else {
          open();
        }
      });

      return { open: open, close: close };
    };

    const selectedSize = document.getElementById('selectedSize').value;
    const selectedQuantity = document.getElementById('selectedQuantity').value;
    const skuId = document.getElementById('selectedSize').options[document.getElementById('selectedSize').selectedIndex].id;

    if (selectedSize !== 'DEFAULT') {
      if (selectedQuantity !== 'DEFAULT') {

        this.props.onAddToCart(skuId, selectedSize, selectedQuantity, () => {
          this.setState({
            rerenderSize: true,
          });
          let productName = document.getElementsByClassName('productName')[0].innerText;
          let style = this.props.styleNames[this.props.currentStyleIndex];
          this.openSuccessModal(productName, style, selectedSize, selectedQuantity);
        });
      }
    }
    if (selectedSize === 'DEFAULT' && selectedQuantity === 'DEFAULT') {
      OpenSelectMenu(document.getElementById('selectedSize'), 3).open();
      const tooltip = document.getElementsByClassName('tooltiptext')[0];
      tooltip.style.visibility = 'visible';

      const tooltip2 = document.getElementsByClassName('tooltiptext2')[0];
      tooltip2.style.visibility = 'visible';
    }
    if (selectedSize === 'DEFAULT' && selectedQuantity !== 'DEFAULT') {
      OpenSelectMenu(document.getElementById('selectedSize'), 3).open();
      const tooltip = document.getElementsByClassName('tooltiptext')[0];
      tooltip.style.visibility = 'visible';
    }
    if (selectedSize !== 'DEFAULT' && selectedQuantity === 'DEFAULT') {
      const tooltip2 = document.getElementsByClassName('tooltiptext2')[0];
      tooltip2.style.visibility = 'visible';
    }
  }

  favorite() {
    saveClickedInteraction('Favorite Start button', 'Add to Cart - Product Overview');
    // Just a placeholder for the favorite button to do nothing when clicked
    console.log('added to favorites');
  }

  setIfQuantitySelected() {
    this.setState({
      quantitySelected: true,
    }, () => {
      const tooltip2 = document.getElementsByClassName('tooltiptext2')[0];
      tooltip2.style.visibility = 'hidden';
    });
  }

  render() {
    let sizeArray;

    if ((this.props.skuIds[0] === 'null' || this.props.currentQuantity === null) && this.state.rerenderSize === false) {
      sizeArray =
      <select className='selectedSize' onChange={this.renderQuantity.bind(this)} defaultValue={'DEFAULT'} disabled>
        <option disabled>OUT OF STOCK!</option>;
      </select>;
      const tooltip = document.getElementsByClassName('cartButton')[0];
      tooltip.style.visibility = 'hidden';
    } else {
      sizeArray =
        <select className='selectedSize' onChange={this.renderQuantity.bind(this)} id='selectedSize' defaultValue={'DEFAULT'} required>
          <option value='DEFAULT' disabled>SELECT SIZE</option>
          {this.props.skuCounts.map((item, index) => (
            <option key={index} id={this.props.skuIds[index]}>{item.size}</option>
          ))}
        </select>;
    }

    if (this.props.skuIds[0] === 'null' && this.state.rerenderSize === true) {
      sizeArray =
        <select className='selectedSize' onChange={this.renderQuantity.bind(this)} defaultValue={'DEFAULT'} disabled>
          <option disabled>OUT OF STOCK!</option>;
        </select>;
      const tooltip = document.getElementsByClassName('cartButton')[0];
      tooltip.style.visibility = 'hidden';
    } else if (this.props.currentQuantity !== null) {
      sizeArray =
        <select className='selectedSize' onChange={this.renderQuantity.bind(this)} id='selectedSize' defaultValue={'DEFAULT'} required>
          <option value='DEFAULT' disabled>SELECT SIZE</option>
          {this.props.skuCounts.map((item, index) => (
            <option key={index} id={this.props.skuIds[index]}>{item.size}</option>
          ))}
        </select>;
    }

    let quantityArray;
    if (!this.props.currentQuantity) {
      quantityArray =
      <select className='selectQuantity' name="selectquantity" defaultValue={'DEFAULT'} disabled>
        <option disabled> - </option>
      </select>;
    } else if (this.props.currentQuantity <= 15) {
      const quantityCount = [];
      for (let i = 0; i < this.props.currentQuantity; i++) {
        quantityCount.push(i);
      }
      quantityArray = <select onChange={this.setIfQuantitySelected.bind(this)} className='selectQuantity' name="selectquantity" id='selectedQuantity' defaultValue='DEFAULT' required>
        <option value='DEFAULT' disabled> - </option>
        {quantityCount.map((item, index) => (
          <option key={index}> {index + 1} </option>
        ))}
      </select>;
    } else if (this.props.currentQuantity >= 15) {
      const quantityCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      quantityArray = <select onChange={this.setIfQuantitySelected.bind(this)} className='selectQuantity' name="selectquantity" id='selectedQuantity' defaultValue='DEFAULT' required>
        <option value='DEFAULT' disabled> - </option>
        {quantityCount.map((item, index) => (
          <option key={index}> {index + 1} </option>
        ))}
      </select>;
    }

    return (
      <div className='addToCart'>
        <form>
          <div className='tooltip'>
            <span className='tooltiptext'>Please select a size</span>
          </div>
          <div className='tooltip2'>
            <span className='tooltiptext2'>Please select a quantity</span>
          </div>
          <div className='selectChoices'>
            {sizeArray}
            {quantityArray}
          </div>
          <br></br>
          <div className='selectChoices'>
            <button type='button' id='userCart' className='cartButton' onClick={this.addToCart.bind(this)}>ADD TO BAG</button>
            <button className='favoriteButton' type='button' onClick={this.favorite.bind(this)}>★</button>
          </div>
        </form>

        <div id="myCartModal" className="cartModal">
          {/* Modal content */}
          <div className="cartModalContent">
            <b><p>The following items have been added to your shopping cart!</p></b>
            <span className="closeCartModal">[x]</span>
            <p className='cartInnerText'>Some text in the Modal..</p>
            <div className='modalButtonscheckout'>
              <div>
                <button onClick={this.closeModal.bind(this)} className='proceedToCheckout'>Proceed to checkout</button>
              </div>
              <div>
                <button onClick={this.closeModal.bind(this)} className='keepShopping'>Keep Shopping</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default AddToCart;