const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/elibraryDB';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.Promise = global.Promise;

