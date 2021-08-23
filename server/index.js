const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const compression = require('compression');
const isaacAPI = require('./QuestionAnswerAPI');
const louisAPI = require('./ProductOverviewAPI');
const helenaAPI = require('./RatingsReviewsAPI');
const { get } = require('jquery');

app.use(compression())
app.use(express.static(`${__dirname} /../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Isaac Routes
// Questions Routes

app.get('/questions', (req, res) => {
  const pid = req.query.qid;
  isaacAPI.getquestionAPI(pid, (cb) => {
    res.send(cb);
  });
});

app.post('/questions', (req, res) => {
  res.send('post questtion route success');
});

app.post('/answer', (req, res) => {
  res.send('done');
});

app.get('/answer', (req, res) => {
  res.send('done');
});



app.get('/ahelpful', (req, res) => {
  res.send('')
});

app.post('/ahelpful', (req, res) => {
  const ahelpfulId = req.body.ahelpid;
  isaacAPI.putAnswerHelpful(ahelpfulId, () => {
    res.send('answerhelp post success');
  });
});


app.get('/qhelpful', (req, res) => {
  const pid = req.query.qid;
  isaacAPI.getQuestionHelpCounter(pid, (cb) => {
    res.send(cb);
  });
});

app.post('/qhelpful', (req, res) => {
  const qhelpfulId = req.body.qhelpid;
  isaacAPI.putQuestionHelpful(qhelpfulId, () => {
    res.send('question help post success');
  });
});

app.get('/addAnswer', (req, res) => {
  res.send('answer post success');
});


app.post('/addAnswer', (req, res) => {
  const data = req.body;
  isaacAPI.postanswerAPI(data);
  res.send('answer post success');
});


app.get('/addQuestion', (req, res) => {
  res.send('answer post success');
});

app.post('/addQuestion', (req, res) => {
  isaacAPI.postquestionAPI(req.body);
  res.send('question post success');
});

app.get('/interaction', (req, res) => {
  res.send('interaction  success');
});

app.post('/interaction', (req, res) => {
  const data = req.body
  isaacAPI.interactionLogger(data)
  res.send('interaction  success');
});


// Louis Routes

app.get('/productdetails', (req, res) => {
  res.send('success');
});

app.post('/productdetails', (req, res) => {
  louisAPI.getProductDetails(req.body.id)
    .then((data) => {
      // console.log('😈 data', data.data);
      res.send(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/product/styles', (req, res) => {
  louisAPI.getProductIdStyles(req.query.pid, (data) => {
    res.send(data.data);
  });
});


app.post('/product/styles', (req, res) => {
  louisAPI.getProductIdStyles(req.body.id, (data) => {
    res.send(data.data);
  });
});

app.post('/addToCart', (req, res) => {
  louisAPI.addItemToCart(parseInt(req.body.sku_id), (data) => {
    res.sendStatus(200);
  });
});

app.post('/userclick', (req, res) => {
  louisAPI.sendUserClickedData(req.body, (data) => {
    // console.log('data after adding interactions click', data)
    res.sendStatus(200);
  });
});


// Helena Routes

app.post('/reviews', async (req, res) => {
  let productID = req.body.productID;
  let sortKind = req.body.sortKind;
  res.status(200).send(await helenaAPI.getReviewsAPI(productID, sortKind))
})

app.post('/postReview', async(req, res) => {
  res.status(200).send(await helenaAPI.postReview(28215));
})
app.post('/markHelpful', async (req, res)=> {
  let productID = req.body.productID;
  res.status(200).send(await helenaAPI.postMarkHelpful(productID))
})
app.post('/productBreakdown', async (req, res) => {
  let productID = req.body.productID;

   res.status(200).send(await helenaAPI.getProductBreakdown(productID));
})
app.post('/uploadimage', async (req, res) => {
  let image = req.body.base64;

   res.status(200).send(await helenaAPI.uploadImages(image));
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
