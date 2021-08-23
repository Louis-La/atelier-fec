const axios = require('axios');
const config = require('../config');

const apiURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/`

const getquestionAPI = (params, cb) => {
  const options = {
    method: 'GET',
    url: apiURL + `qa/questions?product_id=${params}&count=100`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((response) => {
      // console.log('getquestionAPI success');
      return cb(response.data);
    })
    .catch(() => {
      console.log('getquestionapi error');
    });
};

const getQuestionHelpCounter = (params, cb) => {
  const options = {
    method: 'GET',
    url: apiURL + `qa/questions?product_id=${params}`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((response) => {
      // console.log('getQuestionHelpCounter success');
      return cb(response.data);
    })
    .catch(() => {
      console.log('getQuestionHelpCounter error');
    });
};

const getAnswerCounter = (params, cb) => {
  const options = {
    method: 'GET',
    url: apiURL + `qa/questions/${params}/answers?count=100`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((response) => {
      // console.log('axios get success');
      return response.data.results.map((helpful) => {
        const isHelpful = ({
          helpful: helpful.helpfulness,
        });
        return isHelpful;
      });
    })
    .then((data) => {
      cb(data);
    })
    .catch(() => {
      console.log('getAnswerCounter error');
    });
};

const interactionLogger = (data) => {
  const params = {
    element: data.element,
    widget: data.widget,
    time: data.time,
  };
  axios.post(`${apiURL}interactions`, params, {
    headers: {
      Authorization: config.gitToken,
    },
  })
    .then(() => {
      // console.log(`${params}`, 'interaction clicked')
      // console.log('interaction created in API');
    })
    .catch(() => {
      console.log('interaction error');
    });
};

const getIsReportedStatus = (params, cb) => {
  const options = {
    method: 'GET',
    url: apiURL + `qa/questions?product_id=${params}&count=100`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((response) => {
      // console.log('axios get success');
      // console.log(response.data.results);
      return response.data.results.map((report) => {
        const reported = {
          reported: report.reported,
        };
        return reported;
      });
    })
    .then((data) => {
      cb(data);
    })
    .catch(() => {
      console.log('get isreported error');
    });
};

/// POSTING API FUNCTIONS
const postquestionAPI = (data) => {
  const params = {
    body: data.body,
    name: data.name,
    email: data.email,
    product_id: data.product_id,
  };

  axios.post(`${apiURL}qa/questions`, params, {
    headers: {
      Authorization: config.gitToken,
    },
  })
    .then(() => {
      console.log('question created in API');
    })
    .catch(() => {
      console.log('error');
    });
};

const postanswerAPI = (data) => {
  console.log(data, '😅');
  const params = {
    body: data.body,
    name: data.name,
    email: data.email,
    photos: data.photos,
  };
  axios.post(`${apiURL}qa/questions/${data.question_id}/answers`, params, {
    headers: {
      Authorization: config.gitToken,
    },
  })
    .then(() => {
      console.log('Answer created in API');
    })
    .catch(() => {
      console.log('error');
    });
};

const putQuestionHelpful = (params, cb) => {
  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${params}/helpful?count=100`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((data) => {
      console.log('axios get success');
      return cb(data);
    })
    .catch(() => {
      console.log('catch putQuestionHelpful err');
    });
};

const putAnswerHelpful = (params, cb) => {
  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${params}/helpful?count=100`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((data) => {
      console.log('axios get success');
      return cb(data);
    })
    .catch(() => {
      console.log('catch putAnswerHelpful err');
    });
};

const putReportQuestion = (params) => {
  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${params}/report?count=100`,
    headers: { Authorization: config.gitToken },
  };
  axios(options);
};

const putReportAnswer = (params, cb) => {
  const options = {
    method: 'PUT',
    url: `/qa/answers/{":answer_id"}/report`,
    headers: { Authorization: config.gitToken },
  };
  axios(options)
    .then((data) => {
      console.log('axios get success');
      return cb(data);
    })
    .catch(() => {
      console.log('catch answerAPI err');
    });
};

module.exports = {
  getquestionAPI,
  getAnswerCounter,
  getIsReportedStatus,
  postanswerAPI,
  postquestionAPI,
  putQuestionHelpful,
  putReportQuestion,
  putAnswerHelpful,
  putReportAnswer,
  getQuestionHelpCounter,
  interactionLogger
};
