import React from 'react';
import axios from 'axios';
import helpers from '../ratingsReviews/ReviewsHelperFunc.jsx';

class ReviewProductBreakdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metaData: [],
            metaDataDiv: []

        }
        this.getProductReviewMetadata = this.getProductReviewMetadata.bind(this);
         this.generateProductMetadataDiv = this.generateProductMetadataDiv.bind(this);
    }
    getProductReviewMetadata() {
        const productID = this.props.product;
        //make a get request to endpoint for product metadata
        axios({
            method: 'post',
            url: '/productBreakdown',
            //for testing purposes we use this default productID
            data: {productID}
        }).then(response => {
         
           let productMetadata = response.data.characteristics;
           //set the state with this info and then generate the div
            this.setState({metaData: productMetadata}, () => {
                this.generateProductMetadataDiv();
            });
          
            this.props.setProductInfo(productMetadata);
        })

    }
    generateProductMetadataDiv() {
        let productMetadata = this.state.metaData;
        //now we loop through this obj and create an empty bar for each, along with the title
        let infoDiv = [];
        for (let elem in productMetadata) {
            infoDiv.push(helpers.getProductBreakdownBar(elem, productMetadata[elem]));
        }
        this.setState({metaDataDiv: infoDiv})


    }
    componentDidMount(){
        this.getProductReviewMetadata();
    }
    render() {

        return <div>

            {this.state.metaDataDiv}


        </div>
    }
}
export default ReviewProductBreakdown;
