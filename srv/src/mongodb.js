const MongoClient = require('mongodb').MongoClient;

function connectWithRetry (config) {
  return MongoClient.connect(config)
    .then(res => {
      console.log('MongoDB connection established.')
      return res
    })
    .catch(() => {
      console.log('MongoDB connection failed, retrying in 1 second...')
      return new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => connectWithRetry(config))
    })
}

module.exports = function () {
  const app = this;
  const config = app.get('mongodb');
  const promise = connectWithRetry(config)

  app.set('mongoClient', promise);
};
