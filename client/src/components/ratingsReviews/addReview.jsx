import React from 'react';
import $ from 'jquery';
import axios from 'axios';
const config = require('../../../../config.js');
const reader = new FileReader();
import ajax from 'ajax';



class AddReview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalToAddReview: [],
            showModal: false,
            starIcons: [<span className= "fa fa-star empty-star"></span>],
            addReviewButtonDiv: [],
            starInfo: [],
            radioBtnForm: [],
            characteristicsDiv: [],
            allCharacteristicInfo: {
                'Size': {
                    1: 'A size too small',
                    2: '1/2 a size too small',
                    3: 'Perfect',
                    4: '1/2 a size too big',
                    5: 'A size too wide',
                },
                'Width': {
                    1: 'Too narrow',
                    2: 'Slightly narrow',
                    3: 'Perfect',
                    4: 'Slightly Wide',
                    5: 'A size too wide',
                },
                'Comfort': {
                    1: 'Uncomfortable',
                    2: 'Slightly uncomfortable',
                    3: 'Ok',
                    4: 'Comfortable',
                    5: 'Perfect'
                },
                'Quality': {
                    1: 'Poor',
                    2: 'Below average',
                    3: 'What I expected',
                    4: 'Pretty great',
                    5: 'Perfect'
                },
                'Length': {
                    1: 'Runs short',
                    2: 'Runs slighty short',
                    3: 'Perfect',
                    4: 'Runs slightly long',
                    5: 'Runs long'
                },
                'Fit': {
                    1: 'Runs tight',
                    2: 'Runs slightly tight',
                    3: 'Perfect',
                    4: 'Runs slighly long',
                    5: 'Runs long'
                }
            },
            counter: [],
            filesAdded: 1,
            availableCharacteristicsForProduct: [],
            validImages: true,
            imagesURL: [],
            characteristicsIdValueObject: {},
            overallRating: 0
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.buildModal = this.buildModal.bind(this);
        this.buildStarIcons = this.buildStarIcons.bind(this);
        this.addReviewButton = this.addReviewButton.bind(this);
        this.updateStarIcon = this.updateStarIcon.bind(this);
        this.buildStarExplanation = this.buildStarExplanation.bind(this);
        this.buildRadioBtnForm = this.buildRadioBtnForm.bind(this);
        this.buildCharacteristicsDiv = this.buildCharacteristicsDiv.bind(this);
        this.validateFormInput = this.validateFormInput.bind(this);
    }
    showModal(){
        this.setState({showModal: true}, ()=> {
            this.buildModal(this.state.showModal);
        });
    }
    hideModal(){
        this.setState({showModal:false}, ()=> {
            this.buildModal(this.state.showModal);
        });
    }

    buildCharacteristicsDiv(){
        const characteristics = this.props.productInfo;
        let characteristicsArr = [];
        let meaning;
        let collectionOfCharacteristics= {};
        let charIdValueObject = this.state.characteristicsIdValueObject;

        for (let elem in characteristics) {

            charIdValueObject[characteristics[elem].id.toString()] = parseInt(characteristics[elem].value);

            meaning = [];
            if (elem === 'Size') {
                meaning.push(<div id='meaning' key={1}><span key={1}>1 = 'A size too small', 5 = 'A size too big'</span></div>)
            } else if (elem === 'Width') {
                meaning.push(<div id='meaning' key={2}><span key={2}>1 = 'Too Narrow', 5 = 'Too wide'</span></div>)
            } else if (elem === 'Comfort') {
                meaning.push(<div id='meaning' key={3}><span key={3}>1 = 'Uncomfortable', 5 = 'Perfect'</span></div>)
            } else if (elem === 'Quality') {
                meaning.push(<div id='meaning' key={4}><span key={4}>1 = 'Poor', 5 = 'Perfect'</span></div>)
            } else if (elem === 'Length') {
                meaning.push(<div id='meaning' key={5}><span key={5}>1 = 'Runs short', 5 = 'Runs long'</span></div>)
            } else if (elem === 'Fit') {
                meaning.push(<div id='meaning' key={6}><span key={6}>1 = 'Runs tight', 5 = 'Runs long'</span></div>)
            }
            characteristicsArr.push(<div key={111} id={elem}>
                <form >
                <p id = 'review-bold'>{elem}</p>
                <p id = {elem + '-info'}>None selected</p>
                <input type='radio' name={elem} value='1' onClick = {()=> {
                    let info = this.state.allCharacteristicInfo[elem][1];
                    $(`#${elem}-info`).empty();
                    $(`#${elem}-info`).append(info);
                }}></input>
                    <span>1</span>
                <input type='radio' name={elem} value='2' onClick = {()=> {
                    let info = this.state.allCharacteristicInfo[elem][2];
                    $(`#${elem}-info`).empty();
                    $(`#${elem}-info`).append(info);
                }}></input>
                    <span>2</span>
                <input type='radio' name={elem} value='3' onClick = {()=> {
                    let info = this.state.allCharacteristicInfo[elem][3];
                    $(`#${elem}-info`).empty();
                    $(`#${elem}-info`).append(info);
                }}></input>
                    <span>3</span>
                <input type='radio' name={elem} value='4' onClick = {()=> {
                    let info = this.state.allCharacteristicInfo[elem][4];
                    $(`#${elem}-info`).empty();
                    $(`#${elem}-info`).append(info);
                }}></input>
                    <span>4</span>
                <input type='radio' name={elem} value='5' onClick = {()=> {
                    let info = this.state.allCharacteristicInfo[elem][5];
                    $(`#${elem}-info`).empty();
                    $(`#${elem}-info`).append(info);
                }}></input>
                    <span>5</span>
                    </form>
                    {meaning}
            </div>)
        }
        this.setState({characteristicsDiv: characteristicsArr, availableCharacteristicsForProduct: collectionOfCharacteristics, characteristicsIdValueObject: charIdValueObject})

    }
    //handles building the radio button form
    buildRadioBtnForm(){
        const radioForm =
        <div id='radio-form'>
            <ul>
                <li>
                    <input type='radio' name='radio' value='yes'>Yes</input>
                </li>
            </ul>
        </div>
        this.setState({radioBtnForm:radioForm})
    }
    //handles building clickable star icons for our review modal
    buildStarIcons(){
        let starIconsDiv = [];
        for (let i = 1; i <= 5; i++) {
            starIconsDiv.push(
                <span key={1} className= "fa fa-star empty-star star-modal" id={'star-icon' + i} onClick = {()=> {
                    this.setState({overallRating: i });
                    this.updateStarIcon(i);
                }}></span>
            )
        }


        this.setState({starIcons: <div key={1}><div key={1} id ='star-div-modal'>{starIconsDiv}</div><span id='text-explanation'></span></div>})

    }
    //handles updating star icon based on which star is clicked
    updateStarIcon(i) {
     //after clicking, appear meaning of selections
        this.buildStarExplanation();
        for (let a = 1; a <= i; a++) {
            $(`#star-icon${a}`).addClass('full-star');
        }
        // //remove any stars from after i, in case
        for (let a = 5; a > i; a--) {
            $(`#star-icon${a}`).removeClass('full-star');
        }
        const textExplanation =
        `<div id='text-explanation-paragraphs'>
        <p>
        1 star = "Poor"
        </p>
        <p>
        2 star = "Fair"
        </p>
        <p>
        3 star = "Average"
    </p>
    <p>
        4 star = "Good"
    </p>
    <p>
        5 star = "Great"
    </p></div>
        `;
        $(`#text-explanation`).empty()
        $(`#text-explanation`).append(textExplanation)
    // this.buildStarExplanation()

    }
    buildStarExplanation() {
        const textExplanation = <span id='text-explanation'>
        <p>
        1 star = "Poor"
        </p>
        <p>
        2 star = "Fair"
        </p>
        <p>
        3 star = "Average"
    </p>
    <p>
        4 star = "Good"
    </p>
    <p>
        5 star = "Great"
    </p>
        </span>;
        this.setState({starInfo: textExplanation});


    }
    addReviewButton() {
        const reviewBtnDiv =  <div>
            <button id='add-review-btn' onClick = {
                () => {
                    this.showModal()
                }
            }>Add a Review</button>
            {this.state.modalToAddReview}
        </div>
        this.setState({addReviewButtonDiv: reviewBtnDiv})
    }
    buildModal(show) {

        const showHideClassName = show ? 'modal display-block' : 'modal display-none'
        let div = (
            <div className = {showHideClassName}>
                <section className = 'modal-main'>
                    <div id='items-inside-modal'>
                    <h2>Write Your Review</h2>
                    <h3>About the {this.props.productName.productName} </h3>

                    {this.state.starIcons}
                    {this.state.starInfo}
                    <div id='radio-form'>
                        <p id ='review-bold'>Do you recommend this product?</p>
                        <form>
                        <input type='radio' name='radio' value='yes' defaultChecked></input>
                            <span>Yes</span>
                            <br></br>

                        <input type='radio' name='radio' value='no'></input>
                            <span>No</span>
                            </form>

                    </div>
                    {this.state.characteristicsDiv}
                    <form>
                        <p id= 'review-bold'>Review Summary</p>
                        <textarea id = 'review-summary-text' maxLength = '60' placeholder = 'Example: Best purchase ever!'></textarea>
                    </form>
                    <form>
                        <p id= 'review-bold'>Review Body</p>
                        <textarea id = 'review-body-text' maxLength = '1000'  placeholder = 'Why did you like the product or not?' onChange = {(e)=> {
                            let inputBody = e.target.value;
                            let inputBodyLength = inputBody.split('').length;
                            let minimumLeft = 50 - inputBodyLength;
                            $('#counter-review-body').empty();
                            if (minimumLeft > 0) {
                                $('#counter-review-body').append(`Minimum required characters left: ${minimumLeft}`)
                            } else {
                                $('#counter-review-body').append(`Minimum reached`)
                            }
                        }}></textarea>
                    </form>
                    <p id= 'counter-review-body'>Minimum required characters left: 50</p>
                    <form id ='add-files-form'>
                        <p>Upload photos</p>
                        <input  type='file' onChange = { async (e) => {
                           let src = URL.createObjectURL(e.target.files[0]);


                            let count = this.state.filesAdded;
                            if (count < 5) {
                                $('#image-thumbnails').append(`<img src=${src} alt='photo' height = '100' ></img>`);
                                this.setState({filesAdded: count + 1});
                            } if (count === 5) {
                                $('#image-thumbnails').append(`<img src=${src} alt='photo' height = '100' ></img>`);
                                $('#add-files-form').empty();
                                this.setState({filesAdded: 0, count: 0})
                            }
                            //run the validator here and put it in state
                            const files = e.target.files[0];
                            const fileType = files['type'];
                            const validImageType = ['image/jpeg', 'image/png'];
                            if (!validImageType.includes(fileType)) {
                                //set the state
                                this.setState({validImages: false});
                            }

                            //now try uploading the files to imgur
                            // let form = new FormData();
                            // form.append('image', files);
                            //format as binary, base64, or image url


                            //we should not put this in the client but i will refactor later if i have time
                            var form = new FormData();
                            form.append("image", files);
                            var settings = {
                                "url": `https://api.imgbb.com/1/upload?key=${config.imgBBKey}`,
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "data": form
                              };
                              $.ajax(settings).done((response) => {
                                  response = JSON.parse(response);

                                let url = response.data.display_url;
                                let imagesArr = this.state.imagesURL;
                                imagesArr.push(url);
                                this.setState({imagesURL: imagesArr})
                              });

                        }}></input>
                    </form>
                    <div id='image-thumbnails'></div>
                    <p>What is your nickname?</p>
                    <textarea id='nickname-input' maxLength= '60'></textarea>
                    <p>For privacy reasons, do not use your full name or email address</p>
                    <p>Your email</p>
                    <textarea id='email-input' maxLength= '60'></textarea>
                    <p>For authentication reasons, you will not be emailed</p>
                    <button type='button' id='submit-form-button' onClick = {()=> {
                        this.validateFormInput()
                    }}>Submit review</button>
                    <button type='button' id='button-modal' onClick = {()=> {
                        this.hideModal()
                    }}>x</button>
                    </div>
                </section>

            </div>
        );
        this.setState({modalToAddReview: div});
    }
   async validateFormInput(){
        //first grab all the stuff and put it into state
        let overallRating = parseInt(this.state.overallRating);
        let recommend = document.querySelector('input[name="radio"]:checked').value;
        if (recommend === 'Yes') {
            recommend = true;
        } else {
            recommend = false;
        }

        let allCharacteristics = this.state.availableCharacteristicsForProduct;
        //below are boolean values for things that are mandatory
        let allCharacteristicsHaveReviews = true;
        let hasReviewSummary = true;
        let hasReviewBody = true;
        let reviewBodyHasOver50Char = true;
        let hasNickname = true;
        let hasEmail = true;
        //now check photos, below will return boolean
        let validPhotos = this.state.validImages;
        for (let elem in allCharacteristics) {


            if (document.querySelector(`input[name="${elem}"]:checked`) === null) {
                allCharacteristicsHaveReviews = false;
            } else {
                let value = document.querySelector(`input[name="${elem}"]:checked`).value;
                allCharacteristics[elem] = value;
            }

        }
        //get review summary
        let reviewSummary = document.getElementById("review-summary-text").value;
        let reviewBody = document.getElementById("review-body-text").value;

        if (document.getElementById("review-body-text") === null || (reviewBody.trim().split('').length <= 0) ) {
            hasReviewBody = false;
        }
        if (document.getElementById("review-body-text").value.split('').length < 50) {
            reviewBodyHasOver50Char = false;
        }
        //check nickname exists and is at least 1 character
        let nickname = document.getElementById("nickname-input").value;
        if (document.getElementById("nickname-input") === null || nickname.trim().split('').length <= 0) {
            hasNickname = false;
        }
        //check email exists and is at least 1 character
        let email = document.getElementById("email-input").value;
        if (document.getElementById("email-input") === null || email.trim().split('').length <= 0) {
            hasEmail = false;
        }
         //now check email format
         var re = /\S+@\S+\.\S+/;

        let emailFormat =  re.test(email);
        if (!emailFormat) {
            hasEmail = false;


        }
        //now validate all
        if (allCharacteristicsHaveReviews && hasReviewBody && reviewBodyHasOver50Char &&
            hasNickname && hasEmail && validPhotos) {
                //it's all valid, grab the array of images that we have url for



                //need to calculate overall rating from all the individual rcharacterustuc ratubgs

                //now make request to post a review
                let params =  {
                    "product_id": this.props.productId,
                    "rating": overallRating,
                    "summary": reviewSummary,
                    "body": reviewBody,
                    "recommend": recommend,
                    "name": nickname,
                    "email": email,
                    "photos": this.state.imagesURL,
                    "characteristics":  this.state.characteristicsIdValueObject
                };


                let options = {
                    method: 'post',
                    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
                    headers: { Authorization: config.gitToken},
                    data: params
                  };
                   await axios(options)
                  .then(response => {

                      this.hideModal();
                      //and then close the modal
                      //now need to update the reviews
                      this.props.getAndRenderReviews('newest');
                      return;
                  })

        } else {
            //incoming stupid code but too late to refactor
            let alertInfo = '';
            if (!allCharacteristicsHaveReviews) {
                alertInfo += ' characteristic reviews, '
            } if(!hasReviewBody || !reviewBodyHasOver50Char ) {
                alertInfo += 'review body, '
            } if ( !hasNickname) {
                alertInfo += 'nickname, '
            } if (!hasEmail) {
                alertInfo += 'email, '
            } if (!validPhotos) {
                alertInfo += 'valid image files, '
            }
            //now remove last 2 char from this string ', '
            alertInfo = alertInfo.slice(0, -2);
            alert(`You must enter the following: ${alertInfo}`)
            //let's test if we can grab the image
        }
    }

    componentDidMount(){
        this.setState({productInfo: this.props.productInfo}, ()=> {
            this.buildStarIcons();
            this.addReviewButton();

        })
    }
    componentDidUpdate() {
        if (this.props.productInfo !== this.state.productInfo ) {
            this.setState({productInfo: this.props.productInfo});
            this.buildCharacteristicsDiv();
        }
    }
    render() {


        if (Object.keys(this.props.productInfo).length > 0) {

            return <div>
            {this.state.addReviewButtonDiv}
            {this.state.modalToAddReview}
        </div>

        } else {
            return <p>loading...</p>
        }
    }
}

export default AddReview;