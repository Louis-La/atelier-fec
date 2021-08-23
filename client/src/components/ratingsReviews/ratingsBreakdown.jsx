
import React from 'react';
import helpers from './ReviewsHelperFunc.jsx';
import ReviewProductBreakdown from './reviewProductBreakdown.jsx';


class RatingsBreakdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avgReviewDiv: [],
            ratingDistributionDiv: [],
            starBarDiv: [],
            percentageRec: [],
            props: this.props.props

        }
        this.getAvgRating = this.getAvgRating.bind(this);
        this.getRatingBar = this.getRatingBar.bind(this);

    }
    getAvgRating() {

            const reviewsArray = this.props.allReviews;
            // console.log('all reviews,', reviewsArray)


        this.props.getNumOfReviews(reviewsArray.length);
        let totalRating = 0;
        let recommendations = 0;
        reviewsArray.forEach(review => {
            totalRating += review.rating;
            if (review.recommend) {
                recommendations++;
            }
        });
        //need to put this in normal state
        let avgRating = (totalRating/(reviewsArray.length));

        this.props.getAvgRating(avgRating);
        const avgStars = helpers.calculateStarDiv(avgRating, 'avg-rating');
        const avgDiv = <div key={1}><span id='avg-rating'>
            {avgStars}
            </span></div>;
        avgRating = avgRating.toFixed(1);
        recommendations = <span>{((recommendations/reviewsArray.length) * 100).toFixed(1) + '% of reviews recommend this product'}</span>;

        this.setState({avgReviewDiv:avgDiv, avgRating, percentageRec: recommendations}

        );


    }

    getRatingBar() {
        const starBar = helpers.createStarBar(this.props.props.allReviews, this.props.handleFilter);
        this.setState({starBarDiv: starBar});
    }
    componentDidMount() {
        this.setState({allReviews: this.props.props.allReviews}, ()=> {
            this.getAvgRating();
            this.getRatingBar();
        })



    }
    componentDidUpdate(){

        if (this.props.props.allReviews !== undefined) {
            if (this.props.allReviews !== this.state.allReviews) {
                this.getAvgRating();
                this.getRatingBar();
                this.setState({allReviews: this.props.allReviews})
            }

        }

    }

    render() {
        return <div key={1112} id= 'ratings-breakdown'>
           <h2>{this.state.avgRating}</h2>
            {this.state.avgReviewDiv}
           {this.state.percentageRec}
            <div key={32432} id='star-bars'>
                {this.state.starBarDiv}
            </div>
            <ReviewProductBreakdown product = {this.props.product} setProductInfo = {this.props.setProductInfo}/>
        </div>
    }
}
export default RatingsBreakdown;