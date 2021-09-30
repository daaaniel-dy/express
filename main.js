// main.js

// module, lib
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression')
var helmet = require('helmet')

// router
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

// middle ware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

// get방식의 모든 주소에서 request가 들어오면 콜백함수로
// fs.readdir을 호출해 request.list에 data 디렉토리의 파일목록 저장  
app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter); // root directory router
app.use('/topic', topicRouter); // topic directory router

// error code 404 : not found
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// error code 500 : internal server error
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// port number
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});