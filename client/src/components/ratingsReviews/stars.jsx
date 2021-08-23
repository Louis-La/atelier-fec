import React from 'react';
import helpers from '../ratingsReviews/ReviewsHelperFunc.jsx';

class Stars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            star: []
        }
        this.calculateStarDiv = this.calculateStarDiv.bind(this);
    }
    calculateStarDiv() {
        //get the rating number passed in 
        let rating = this.props.rating;
        const starDiv = helpers.calculateStarDiv(rating, this.props.starKey);
        this.setState({star: starDiv})
    }

    componentDidMount() {
        this.calculateStarDiv();
    }
    render () {
        return <div>
            {this.state.star}
        </div>
    }
}
export default Stars;