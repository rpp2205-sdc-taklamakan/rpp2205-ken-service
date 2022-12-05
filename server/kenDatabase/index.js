require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');
const compression = require('compression');
const Promise = require("bluebird");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(compression());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../../client/dist')));

const headers = {headers: {authorization: process.env.TOKEN}};
const root = 'http://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'

/* ---- QA ---- */

app.get('/qa/questions/:product_id', (req, res) => {
  db.query(`SELECT * from Question where productId=641753;`)
  .then((data) => {
    //console.log('DATA:', data)
    //console.log(`${req.params.product_id}`)
    let newData = {
      product_id: `${req.params.product_id}`,
      results: []
    }
    let resultData = {
      question_id: null,
      question_body: null,
      question_date: null,
      asker_name: null,
      question_helpfulness: null,
      reported: null,
      answers: null
    };
    data.forEach((item) => {
      resultData.question_id = data.idquestion;
      resultData.question_body = data.body;
      resultData.question_date = data.date;
      resultData.asker_name = data.askername;
      resultData.question_helpfulness = data.helpfulness;
      resultData.reported = data.reported;
      resultData.answers = {};
    })
    let resultAnswers = {
      id: null,
      body: null,
      date: null,
      answerer_name: null,
      helpfulness: null,
      photos:[]
    }
    let resultPhotos = [];

  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.status(404).send(error)
  })
  axios.get(url, headers)
  .then((response) => {
    console.log(response.data.results[0]['answers']['5989327'], 'test')
    res.status(200).json(response.data)
  })
  .catch((err) => console.error(err))
})

// get questions
app.get('/qa/questions/:product_id', (req, res) => {
  let url = `${root}/qa/questions/?product_id=${req.params.product_id}&count=50`;
  axios.get(url, headers)
  .then((response) => res.status(200).json(response.data))
  .catch((err) => console.error(err))
})

// get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let url = `${root}/qa/questions/${req.params.question_id}/answers?count=50`;
  axios.get(url, headers)
  .then((response) => res.status(200).json(response.data))
  .catch((err) => console.error(err))
})

// post a question
app.post('/qa/questions', (req, res) => {
  let url = `${root}/qa/questions`;
  axios.post(url, req.body, headers)
  .then((response) => {
    console.log('Success Creating Question');
    console.log('Response', response);
    res.status(201).json(response.data)
  })
  .catch((err) => { console.error(err) })
})

// post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  let url = `${root}/qa/questions/${req.params.question_id}/answers`;
  axios.post(url, req.body, headers)
  .then((response) => {
    console.log('Success Creating Answer');
    res.status(201).json(response.data)
  })
  .catch((err) => { console.error(err) })
})

// mark question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let url = `${root}/qa/questions/${req.params.question_id}/helpful`;
  axios.put(url, {}, headers)
  .then((response) => res.status(204).json(response.data))
  .catch((err) => console.error(err))
})

// mark answer helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let url = `${root}/qa/answers/${req.params.answer_id}/helpful`;
  axios.put(url, {}, headers)
  .then((response) => res.status(204).json(response.data))
  .catch((err) => console.error(err))
})


// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  let url = `${root}/qa/answers/${req.params.answer_id}/report`;
  axios.put(url, {}, headers)
  .then((response) => res.status(204).json(response.data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})



// product reviews meta
app.get('/reviews/meta/:product_id', (req, res) => {
  let url = `${root}/reviews/meta?product_id=${req.params.product_id}`;
  return axios.get(url, headers)
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


// product
app.get('/products/:product_id', (req, res) => {
  let url = `${root}/products/${req.params.product_id}`;
  return axios.get(url, headers)
          .then(result => {
            res.status(200).json(result.data)})
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            })
});


let PORT = 3001;
app.listen(PORT, () => console.log(`Listening at Port: ${PORT}`));
