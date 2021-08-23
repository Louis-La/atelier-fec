import React from 'react';
import $ from 'jquery';
import Zoom from 'react-img-zoom';
import saveClickedInteraction from './UserClickInteractions.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      currentPage: 1,
      listTwoCurrent: 0,
      screenSize: 'normal',
      displayThumbnails: 'yes',
      displayIcons: 'no',
      productIdNumber: props.productId,
    };
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  componentDidUpdate() {
    if (this.state.productIdNumber !== this.props.productId) {
      this.setState({
        current: 0,
        productIdNumber: this.props.productId,
      });
    }
  }

  nextSlide() {
    saveClickedInteraction('Right Arrow button', 'Photo Gallery - Product Overview');
    const length = this.props.fullSizePhotos.length;
    let placeholder = this.state.current + 1;
    if (this.state.current === length - 1) {
      this.setState({
        current: this.state.current,
      });
    } else if (this.state.current < 6) {
      document.getElementsByClassName('imageThumb')[this.state.current].classList.remove('selectedThumbnail');
      document.getElementsByClassName('imageThumb')[this.state.current + 1].classList.add('selectedThumbnail');
      this.setState({
        current: placeholder,
      });
    } else if (this.state.current === 6) {
      document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
      this.setState({
        currentPage: 2,
        current: placeholder,
      }, () => {
        document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.add('selectedThumbnail');
        if (this.state.screenSize === 'full') {
          let thumbnailsArray = document.getElementsByClassName('imageThumb');
          for (let i = 0; i < thumbnailsArray.length; i++) {
            document.getElementsByClassName('imageThumb')[i].style.height = '2.3em';
            document.getElementsByClassName('imageThumb')[i].style.width = '2.3em';
            document.getElementsByClassName('imageThumb')[i].style.filter = 'grayscale(85%)';
          }
        }
      });
    } else if (this.state.current > 6) {
      let newCurrent = this.state.current + 1;
      let listTwoIndex = this.state.listTwoCurrent + 1;
      document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
      this.setState({
        listTwoCurrent: listTwoIndex,
        current: newCurrent,
      }, () => {
        document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.add('selectedThumbnail');
      });
    }
  }

  prevSlide() {
    saveClickedInteraction('Left Arrow button', 'Photo Gallery - Product Overview');
    const length = this.props.fullSizePhotos.length;
    let first = length - 1;
    let second = this.state.current - 1;
    if (this.state.current === 0) {
      this.setState({
        current: this.state.current,
      });
    } else if (this.state.currentPage === 2 && this.state.listTwoCurrent !== 0) {
      let newCurrent = this.state.current - 1;
      let listTwoIndex = this.state.listTwoCurrent - 1;
      document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
      this.setState({
        listTwoCurrent: listTwoIndex,
        current: newCurrent,
      }, () => {
        document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.add('selectedThumbnail');
      });
    } else if (this.state.currentPage === 2 && this.state.listTwoCurrent === 0) {
      let newCurrent = this.state.current - 1;
      let listTwoIndex = this.state.listTwoCurrent - 1;
      document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
      this.setState({
        currentPage: 1,
        current: newCurrent,
        listTwoCurrent: 0,
      }, () => {
        document.getElementsByClassName('imageThumb')[this.state.current].classList.add('selectedThumbnail');
        if (this.state.screenSize === 'full') {
          let thumbnailsArray = document.getElementsByClassName('imageThumb');
          for (let i = 0; i < thumbnailsArray.length; i++) {
            document.getElementsByClassName('imageThumb')[i].style.height = '2.3em';
            document.getElementsByClassName('imageThumb')[i].style.width = '2.3em';
            document.getElementsByClassName('imageThumb')[i].style.filter = 'grayscale(85%)';
          }
        }
      });
    } else {
      document.getElementsByClassName('imageThumb')[this.state.current].classList.remove('selectedThumbnail');
      document.getElementsByClassName('imageThumb')[this.state.current - 1].classList.add('selectedThumbnail');
      this.setState({
        current: second,
      });
    }
  }

  nextSetOfThumbnails() {
    saveClickedInteraction('More Photos at current Style div', 'Photo Gallery - Product Overview');
    if (this.state.currentPage === 1) {
      document.getElementsByClassName('imageThumb')[this.state.current].classList.remove('selectedThumbnail');
      this.setState({
        currentPage: 2,
        current: 7,
        listTwoCurrent: 0,
      }, () => {
        document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.add('selectedThumbnail');
      });
    } else if (this.state.currentPage === 2) {
      document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
      this.setState({
        currentPage: 1,
        current: 6,
        listTwoCurrent: 0,
      }, () => {
        document.getElementsByClassName('imageThumb')[this.state.current].classList.add('selectedThumbnail');
      });
    }
  }

  // When main image or the fullscreen button is clicked
  changeFullscreen() {
    saveClickedInteraction('Fullscreen button', 'Photo Gallery - Product Overview');
    if (this.state.screenSize === 'normal') {
      // Remove the old CSS sizing of the current main image and change it to the fullscreen size settings
      document.getElementsByClassName('photoCarouselChild')[0].classList.remove('carouselChild2');
      document.getElementsByClassName('photoCarouselChild')[0].classList.add('fullScreenCarousel');

      document.getElementsByClassName('changePhotoToFull')[0].classList.remove('mainPhotoImage');
      document.getElementsByClassName('changePhotoToFull')[0].classList.add('fullscreenMainPhotoImage');
      // change the state the full so that it re-renders with the new CSS
      this.setState({
        screenSize: 'full',
      }, () => {
        document.getElementsByClassName('changePhotoToFull')[0].classList.remove('myImg');
        document.getElementsByClassName('changePhotoToFull')[0].classList.add('myImg2');

        let thumbnailsArray = document.getElementsByClassName('imageThumb');
        for (let i = 0; i < thumbnailsArray.length; i++) {
          document.getElementsByClassName('imageThumb')[i].style.height = '2.3em';
          document.getElementsByClassName('imageThumb')[i].style.width = '2.3em';
          document.getElementsByClassName('imageThumb')[i].style.filter = 'grayscale(85%)';
        }
      });
    } else if (this.state.screenSize === 'full') {
      // On click will return the image size back
      document.getElementsByClassName('photoCarouselChild')[0].classList.remove('fullScreenCarousel');
      document.getElementsByClassName('photoCarouselChild')[0].classList.add('carouselChild2');

      document.getElementsByClassName('changePhotoToFull')[0].classList.remove('fullscreenMainPhotoImage');
      document.getElementsByClassName('changePhotoToFull')[0].classList.add('mainPhotoImage');

      this.setState({
        screenSize: 'normal',
      }, () => {
        document.getElementsByClassName('changePhotoToFull')[0].classList.remove('myImg2');
        document.getElementsByClassName('changePhotoToFull')[0].classList.add('myImg');
        let thumbnailsArray = document.getElementsByClassName('imageThumb');
        for (let i = 0; i < thumbnailsArray.length; i++) {
          document.getElementsByClassName('imageThumb')[i].style.height = '3.9em';
          document.getElementsByClassName('imageThumb')[i].style.width = '3.9em';
          document.getElementsByClassName('imageThumb')[i].style.filter = 'none';
        }
      });
    }
  }

  // Changes the currently shown main image depending on the current index of the style's array
  changeMainPhoto(event) {
    saveClickedInteraction('Change main photo thumbnail img', 'Photo Gallery - Product Overview');
    if (this.state.currentPage === 1) {
      const clickedIndex = parseInt(event.currentTarget.id);
      // remove marker from current selected thumbnail and add to newly clicked one
      document.getElementsByClassName('imageThumb')[this.state.current].classList.remove('selectedThumbnail');
      event.currentTarget.classList.add('selectedThumbnail');
      this.setState({
        current: clickedIndex,
      });
    } else if (this.state.currentPage === 2) {
      const clickedIndex = parseInt(event.currentTarget.id);
      // remove marker from current selected thumbnail and add to newly clicked one
      event.currentTarget.classList.add('selectedThumbnail');
      document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
      const nextIndex = clickedIndex - 7;
      this.setState({
        current: clickedIndex,
        listTwoCurrent: nextIndex,
      }, () => {
      });
    }
  }

  // Functions for when zooming in and out 2.5x for the main selected image
  zoomTwoTimes() {
    saveClickedInteraction('Zoom in 2.5x on photo img', 'Photo Gallery - Product Overview');
    this.setState({
      screenSize: 'zoom',
      displayThumbnails: 'no',
    });
  }

  clickOutZoom() {
    this.setState({
      screenSize: 'full',
      displayThumbnails: 'yes',
    }, () => {
      let thumbnailsArray = document.getElementsByClassName('imageThumb');
      for (let i = 0; i < thumbnailsArray.length; i++) {
        document.getElementsByClassName('imageThumb')[i].style.height = '2.3em';
        document.getElementsByClassName('imageThumb')[i].style.width = '2.3em';
        document.getElementsByClassName('imageThumb')[i].style.filter = 'grayscale(85%)';
      }
      document.getElementsByClassName('changePhotoToFull')[0].classList.remove('myImg');
      document.getElementsByClassName('changePhotoToFull')[0].classList.add('myImg2');
      if (this.state.currentPage === 1) {
        document.getElementsByClassName('imageThumb')[this.state.current].classList.add('selectedThumbnail');
      } else if (this.state.currentPage === 2) {
        document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.add('selectedThumbnail');
      }
    });
  }

  render() {
    // conditional rendering if the new style's length is shorter than the previous style's length - adjust the indices
    if (this.state.currentPage === 2) {
      if (this.props.fullSizePhotos.length <= this.state.current) {
        document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.remove('selectedThumbnail');
        let newIndex = this.props.fullSizePhotos.length - 1;
        let newIndex2 = newIndex - 7;
        this.setState({
          current: newIndex,
          listTwoCurrent: newIndex2,
        }, () => {
          document.getElementsByClassName('imageThumb')[this.state.listTwoCurrent].classList.add('selectedThumbnail');
        });
      }
    } else if (this.state.currentPage === 1) {
      if (this.props.fullSizePhotos.length <= this.state.current) {
        console.log('is more');
        document.getElementsByClassName('imageThumb')[this.state.current].classList.remove('selectedThumbnail');
        let newIndex = this.props.fullSizePhotos.length - 1;
        this.setState({
          current: newIndex,
        }, () => {
          document.getElementsByClassName('imageThumb')[this.state.current].classList.add('selectedThumbnail');
        });
      }
    }

    // conditional rendering of the main image depending at what stage (normal, fullscreen, zoomed) the main image is at
    let mainImage;
    if (this.state.screenSize === 'normal') {
      mainImage = <img onClick={this.changeFullscreen.bind(this)} src={this.props.fullSizePhotos[this.state.current]} alt='main photo' className='changePhotoToFull mainPhotoImage myImg'/>;
    } else if (this.state.screenSize === 'full') {
      mainImage = <img onClick={this.zoomTwoTimes.bind(this)} src={this.props.fullSizePhotos[this.state.current]} alt='main photo' className='changePhotoToFull fullscreenMainPhotoImage myImg'/>;
    } else if (this.state.screenSize === 'zoom') {
      mainImage =
      <div className='clickOutZoom' onClick={this.clickOutZoom.bind(this)}>
        <Zoom
          onClick={this.clickOutZoom.bind(this)}
          img={this.props.fullSizePhotos[this.state.current]}
          zoomScale={2.5}
          width={928}
          height={525}
        />
      </div>;
    }

    // conditional rendering of the thumbnails depending at what stage (normal, fullscreen, zoomed) the main image is at
    let first7Pics;
    let secondSetPics;
    let currentThumbnails;

    if (this.state.displayThumbnails === 'yes') {
      if (this.props.smallSizePhotos.length <= 7) {
        currentThumbnails = this.props.smallSizePhotos.map((slide, index) => {
          return (
            <img key={index} onClick={this.changeMainPhoto.bind(this)} src={slide} alt='slide' className='imageThumb' id={index} />
          );
        });
      } else if (this.state.currentPage === 1) {
        first7Pics = this.props.smallSizePhotos.slice(0, 7);
        currentThumbnails = first7Pics.map((slide, index) => {
          return (
            <img key={index} onClick={this.changeMainPhoto.bind(this)} src={slide} alt='slide' className='imageThumb' id={index} />
          );
        });
      } else if (this.state.currentPage === 2) {
        secondSetPics = this.props.smallSizePhotos.slice(7, 14);
        currentThumbnails = secondSetPics.map((slide, index) => {
          return (
            <img key={index} onClick={this.changeMainPhoto.bind(this)} src={slide} alt='slide' className='imageThumb' id={index + 7} />
          );
        });
      }
    } else if (this.state.displayThumbnails === 'no') {
      currentThumbnails = <div></div>;
    }

    // conditional rendering of arrows depending on the current state of the main image and index of the shown image
    let leftArrow = <button className='left-arrow' onClick={this.prevSlide}>←</button>;
    let rightArrow = <button className='right-arrow' onClick={this.nextSlide}>→</button>;
    let downArrow = <button className='downArrow' onClick={this.nextSetOfThumbnails.bind(this)}>↓</button>;
    let displayExpandButton;

    if (this.state.displayThumbnails === 'yes') {
      if (this.state.current === 0) {
        leftArrow = <button className='left-arrow' style={{visibility: 'hidden'}} onClick={this.prevSlide}>←</button>;
      } else if (this.state.current === this.props.fullSizePhotos.length - 1) {
        rightArrow = <button className='right-arrow' style={{visibility: 'hidden'}} onClick={this.prevSlide}>→</button>;
      }
      if (this.props.smallSizePhotos.length <= 7) {
        downArrow = <button style={{visibility: 'hidden'}} className='downArrow' onClick={this.nextSetOfThumbnails.bind(this)}>↓</button>;
      }
    } else if (this.state.displayThumbnails === 'no') {
      leftArrow = <button className='left-arrow' style={{visibility: 'hidden'}} onClick={this.prevSlide}>←</button>;
      rightArrow = <button className='right-arrow' style={{visibility: 'hidden'}} onClick={this.prevSlide}>→</button>;
      downArrow = <button style={{visibility: 'hidden'}} className='downArrow' onClick={this.nextSetOfThumbnails.bind(this)}>↓</button>;
    }

    if (this.state.displayThumbnails === 'yes' && this.state.screenSize === 'normal') {
      displayExpandButton = <div onClick={this.changeFullscreen.bind(this)} className='fullscreenButton' title='Expand'>✚
      </div>;
    } else if (this.state.displayThumbnails === 'yes' && this.state.screenSize === 'full') {
      displayExpandButton = <div onClick={this.changeFullscreen.bind(this)} className='closefullscreenbutton' title='Expand'>X
      </div>;
    }

    return (
      <div className='carouselContainer' >
        {/* Thumbnails on the side */}
        <div className='carouselChild1'>
          <div className='thumbnailDownLine'>
            {currentThumbnails}
          </div>
          <div className='centerDownArrow'>
            {downArrow}
          </div>
        </div>
        {/* Main image shown */}
        <div className='photoCarouselChild carouselChild2'>
          {leftArrow}
          {mainImage}
          {rightArrow}
        </div>
        {displayExpandButton}
      </div>
    );
  }
}

export default Carousel;
