const axios = require('axios');
const config = require('../config');

// GET API FUNCTIONS
const getProductDetails = (productId) => {
  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    headers: { Authorization: config.gitToken },
  };
  return axios(options);
};

const getProductIdStyles = (productId, cb) => {
  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addItemToCart = (skuId, cb) => {
  const params = { sku_id: skuId };
  const options = {
    method: 'POST',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart',
    data: params,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendUserClickedData = (data, cb) => {
  const params = {
    element: data.element,
    widget: data.widget,
    time: data.time,
  };
  const options = {
    method: 'POST',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
    data: params,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = {
  getProductDetails,
  getProductIdStyles,
  addItemToCart,
  sendUserClickedData,
};