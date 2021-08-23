import React from 'react';
import jquery from 'jquery';
window.$ = window.jquery = jquery;

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
         this.createImageDiv = this.createImageDiv.bind(this);
         this.modalClick = this.modalClick.bind(this);
         this.closeModalClick = this.closeModalClick.bind(this);
    }
    modalClick = (imageID, imageSrc)=> {

        let modal = document.getElementById('mymodal' + imageID)
        let modalImg = document.getElementById('modalImg' + imageID)

        modalImg.src = imageSrc;
        modal.style.display = "block";


    }
    closeModalClick(modal, id) {

            $("#" + modal).css('display', 'none');
            $('#' + id).css("display", "none");
            $('#' + id).css("display", "block");
    }
    createImageDiv(imageArr) {
        let imagesDiv = [];
        imageArr.forEach(image => {
            imagesDiv.push(
            <div id ='review-images'>
                <img id= "review-image" alt='picture' className = {image.id} onClick = { (e)=> {
                    e.preventDefault();
                    this.modalClick(image.id, image.url);

                }} key= {image.id} src= {image.url}/>

                <div id= {"mymodal" + image.id} className = 'modal'>
                    <span className = {'close-modal'} id = {'close-modal'+ image.id}onClick = { () => {
                        this.closeModalClick("mymodal" + image.id, 'close-modal'+ image.id );
                    }}>X</span>
                    <img alt='image' className="modal-content" id= {"modalImg" + image.id}/>
                </div>
            </div>)
        });
        let div = <div >{imagesDiv}</div>
        this.setState({images: div});

    }
    componentDidMount() {
        this.createImageDiv(this.props.props);
    }
    render() {
        return <div>

            {this.state.images}
        </div>
    }
}
export default Images;