const axios = require('axios');
const config = require('../config');
const ajax = require('ajax');


const apiURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/`
const getReviewsAPI = (productID, sortKind = 'helpful') => {
    //makes call to the api
    //the param is what we're looking for


     let options = {
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productID}&sort=${sortKind}&count=100`,
        headers: { Authorization: config.gitToken },
      
      };
      return axios(options)
      .then(response => {
          let sortedArr;
          if (response.data === undefined) {
              return;
          }
        if (sortKind === 'helpful') {
            sortedArr = response.data.results.sort((a,b) => {
                return a.helpfulness > b.helpfulness;
            });
         } else if (sortKind === 'newest') {
            sortedArr = response.data.results.sort((a,b)=> {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
        } else {
            //first sort by date
            let sortOne = response.data.results.sort((a,b)=> {
                return new Date(b.date).getTime() - new Date(a.date).getTime(); 
            });
            let length = sortOne.length;
            if (sortOne === undefined) {
                return;
            }
            
            //now we run our relevance sort for half the length of the sortOne array. that will push up the helpful reviews, but not all the way up
            for (let i = 0; i < (Math.floor(sortOne.length / 2)); i++) {
                for (let a = 0; a < length; a+=2) {
                    if (sortOne[a + 1] !== undefined) {
                    if (sortOne[a + 1].helpfulness > sortOne[a].helpfulness) {
                        let one = sortOne[a + 1];
                        let two = sortOne[a];
                        sortOne[a] = one;
                        sortOne[a + 1] = two;
                    }
                }
                }
            }
            sortedArr = sortOne;
        }

         return sortedArr;

      });

}
const relevanceSort = (array) => {         
    for (let i = 0; i < array.length; i+2) {
        if (array[i + 1].helpfulness > array[i].helpfulness) {
            let one = array[i + 1];
            let two = array[i];
            array[i] = one;
            array[i + 1] = two;
        }
    }
    return array;
}

const postReview = async (productID) => {
    let params =  {
        "product_id": 28215,
        "rating": 5,
        "summary": "this is awesome",
        "body": "it fits me perfectly",
        "recommend": true,
        "name": "helena",
        "email": "helena@yahoo.com",
        "photos": [],
        "characteristics":  { "14": 5, "15": 5}
    };
    let options = {
        method: 'post',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
        headers: { Authorization: config.gitToken},
        data: params
      };
       await axios(options);

}
const postMarkHelpful= async (productID) => {
  
    let options = {
        method: 'PUT',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${productID}/helpful?count=100`,
        headers: { Authorization: config.gitToken },
      };
      axios(options)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log( err);
        });

}
const getProductBreakdown = async (productID) => {
    let options = {
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${productID}`,
        headers: { Authorization: config.gitToken },
        // data:params
      };
     return await axios(options)
        .then((response) => {

          return response.data;
        })
        .catch((err) => {
          console.log( err);
        });
}
const uploadImages = async(base64) => {

    let settings = {
        "url": `https://api.imgbb.com/1/upload?key=${config.imgBBKey}`,
        "method": "POST",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "image": base64
        
    };
    axios({settings}).done(function (response) {
     
        var jx = JSON.parse(response);
    
    })
}

module.exports = {
    getReviewsAPI,
     postReview,
     postMarkHelpful,
     getProductBreakdown,
     uploadImages

};
