import axios from 'axios';
import React from 'react';
import $ from 'jquery';
const helpfulReviewsClicked = {};
const helpers = {

    reviewResponse: (response) => {

        if (response !== null && response !== "") {
            return (<div id = 'response'>
                <h3>Response from seller</h3>
                <p>{response}</p>
            </div>);
        }
    },
    generateRecommend: (recommend) => {
        if (recommend) {
            return (<p>✓ I recommend this product</p>);
        }
    },

    //checks if the review has already been clicked for helpfulness already
    checkIfHelpfulnessClicked : (id) => {
        if (helpfulReviewsClicked[id]) {
            return true;
        }
        return false;
    },
    generateHelpfulness: (helpNum = 0, id) => {


            return (<div id="helpful">
                <span id="helpful-question">Helpful?
                <span id= {"helpful-link" + id} onClick = {
                    () => {
                        const clickedAlready = helpers.checkIfHelpfulnessClicked(id);
                        if (!clickedAlready) {
                            helpers.markHelpfulAPI(id);
                            //now need to update the DOM with what we got
                            $('#helpfulness-' + id).text(helpNum + 1);
                            helpfulReviewsClicked[id] = true;
                        }
                    }
                }> Yes (<span id= {"helpfulness-" + id } className = "helpful-link">{helpNum}</span>)</span>
                </span>

            </div>)


    },
    markHelpfulAPI: (productID) => {
        axios({
            method: "POST",
            url:'/markHelpful',
            data: {productID}
        }).then(response => {
            return true;
        })

    },
    getQuarterStarAmount: (value)=> {

        if (value <= 0) {
            return 0;
        } if (value < .5) {
            return 25;
        } if (value < .75) {
            return 50;
        } return 75;

    },
    calculateStarDiv: (rating, key)=> {
        //get how many full stars there should be by rounding down the nearest num
        const fullStars = Math.floor(rating);
        //get the quarterStarAmount
        const quarterStar = (helpers.getQuarterStarAmount(rating - fullStars))/100;
        //loop through full stars to create full star div
        //first create 5 empty stars

        let fullStarDiv = []
        for (let i = 0; i < fullStars; i++) {
            fullStarDiv.push(<span key={i} className= "fa fa-star empty-star full-star"></span>)
        }
        //add the quarter star div if we have quarter stars
        if (quarterStar > 0) {
            fullStarDiv.push(<span key={quarterStar} className= "fa fa-star empty-star" id={"star-" + (quarterStar*100).toString()}/>);
        }
        //now test if we need any empty stars, like if the review is 2 out of 5 stars
        const emptyStars = Math.floor(5 - fullStars - quarterStar);
        if (emptyStars > 0) {
            for (let i = 0; i < emptyStars; i++) {
                fullStarDiv.push(<span key={i + 1777} className= "fa fa-star empty-star"></span>)
            }
        }
        let starDiv = <div key={key + 'star'}>{fullStarDiv}</div>;
        return starDiv;

    },
    createStarBar: (reviewsArray, filterFunc) => {
        if (!reviewsArray || reviewsArray.length === 0) {
            return;
        }
        let fiveStar = [], fourStar = [], threeStar = [], twoStar = [], oneStar = [];
        reviewsArray.forEach(review => {
            if (review.rating === 5) {
                fiveStar.push(review);
            } else if (review.rating === 4) {
                fourStar.push(review);
            } else if (review.rating === 3) {
                threeStar.push(review);
            } else if (review.rating === 2) {
                twoStar.push(review);
            } else {
                oneStar.push(review);
            }
        });

        //now create five star bar

        const allReviewsDiv = [];
        allReviewsDiv.push(helpers.getBar(fiveStar, reviewsArray.length, '5', filterFunc), helpers.getBar(fourStar, reviewsArray.length, '4', filterFunc),
        helpers.getBar(threeStar, reviewsArray.length, '3',filterFunc), helpers.getBar(twoStar, reviewsArray.length, '2', filterFunc),
        helpers.getBar(oneStar, reviewsArray.length, '1',filterFunc) )



       return <div>{allReviewsDiv} </div>;

    },
    getBar: (starArr, totalReviews, starAmount, filterFunc) => {
        const widthAmount = Math.abs(((starArr.length)/(totalReviews)*100)).toFixed(0);
        const returnDiv =
            <div onClick = {()=> {
                filterFunc(starAmount)
            }} id='breakdown-star-count'>
                <span id ='bar-type' key ='bar-type'>{starAmount} Stars</span>
                <div id = 'bar' key = 'bar'>
                    <div className="w3-light-grey">
                        <div className='w3-green' style={{height:"1em", width:`${widthAmount + "%"}`}}>
                        </div>
                    </div>
                </div>

                <span id ='reviews-total-bar'>{starArr.length + ' reviews total'}</span>


                <br></br>
            </div>;
        return returnDiv;
    },
    getProductBreakdownBar: (title, info) => {

        //now get the characteristics
        let firstCharacterstic, secondCharacteristic, thirdCharacteristic;
        if (title === 'Width' || title ==='Comfort' || title === 'Quality' ) {
            firstCharacterstic = 'poor';
            secondCharacteristic = '';
            thirdCharacteristic = 'great'

        } else {
            firstCharacterstic = 'too small';
            secondCharacteristic = '';
            thirdCharacteristic = 'too big'

        }

        //find the percentage out of 100 of the rating
        let rating = info.value;
        const percentage = (rating/5) * 100;;
        const rightEMval = (-18.5 + (percentage * 0.17)).toString() + 'em';

        return(<div key={title}>
            <p>{title}</p>
            <div key={12} id = 'metadata-bar'>
                <span key={1} id='triangle' style={{left: rightEMval}} key="triangle">▲</span>
                <div key={1} id = 'metadata-bar-individual' key = { title + 'bar1'}>
                    <div className="w3-light-grey" key={'light-grey-default'+title + '1'}>
                        <div className='w3-green metadata-bar-individual' key={'light-green-default'+title + '1'} style={{height:"2em", width:"0%"}}/>
                    </div>
                 </div>


                <div key={2} id = 'metadata-bar-individual' key = { title + 'bar2'}>
                    <div className="w3-light-grey" key={'light-grey-default'+title + '2'}>
                        <div className='w3-green metadata-bar-individual' key={'light-green-default'+title + '2'} style={{height:"2em", width:"0%"}}/>
                    </div>

                </div>
                <div key={3} id = 'metadata-bar-individual' key = { title + 'bar3'}>
                    <div className="w3-light-grey" key={'light-grey-default'+title + '3'}>
                        <div className='w3-green metadata-bar-individual' key={'light-green-default'+title + '3'} style={{height:"2em", width:"0%"}}/>
                    </div>

                </div>
                <br></br>
            </div>

            <br></br>
            <div id = 'first-characteristic' key= 'first-characteristic'>{firstCharacterstic} </div>

               <div id = 'third-characteristic'key= 'second-characteristic'>{thirdCharacteristic}</div>
               <br></br>

        </div>)


    }

}
export default helpers;
