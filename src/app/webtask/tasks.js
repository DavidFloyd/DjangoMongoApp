'use strict';

const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = new express();
app.use(bodyParser.json());

app.get('/', getTasks);
app.get('/', addTask);
app.get('/', deleteTask);

module.exports = app;

function addTask(req, res) {
  let userCollection = loadUserCollection(req.webtaskContext);

  userCollection.save({createdAt: new Date(), description: req.body.description}, () = > res.end()
)
}

function getTasks(req, res) {
  let userCollection = loadUserCollection(req.webtaskContext);

  userCollection.find().sort({createdAt: -1}, (err, data) = > {res.status(err ? 500 : 200).send(err || data)
})
  ;
}

function deleteTask() {
  let userCollection = loadUserCollection(req.webtaskContext);
  userCollection.remove({_id: mongojs.ObjectId(req.query.id)}, () = > res.end()
)
  ;
}

function loadUserCollection() {
  const AUTH0_SECRET = webtaskContext.secrets.AUTH0_SECRET;
  const MONGO_USER = webtaskContext.secrets.MONGO_USER;
  const MONGO_PASSWORD = webtaskContext.secrets.MONGO_PASSWORD;
  const MONGO_URL = webtaskContext.secrets.MONGO_URL;

  let authorizationHeader = webtaskContext.headers.authorization;
  authorizationHeader = authorizationHeader.replace('Bearer ', '');

  let token = jwt.verify(authorizationHeader, AUTH0_SECRET);

  let mongodb = mongojs(`${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`);
  return mongodb.collection(token.sub);

}
