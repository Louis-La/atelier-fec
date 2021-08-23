import React from 'react';
import axios from 'axios';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.getReviews = this.getReviews.bind(this);
    }
    //function to handle getting the reviews for the given product id
    getReviews() {
        //this is what it will be for the final productid
        // const productID = this.props.props.productId;
        //for testing we will use this
        const productID = 1;
        axios({
            method: 'Get',
            url: '/getReviews'
        }).then(response => {
            console.log('response');
        })


    }
    componentDidMount() {
        this.getReviews();
    }

    render() {

        return (
            <div>
                <h1>reviews module</h1>
                <h1>tile 1</h1>
                <h1>tile 2</h1>
            </div>
        )
    }
}
export default Reviews;