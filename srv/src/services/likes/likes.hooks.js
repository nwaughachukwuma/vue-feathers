const search = require('feathers-mongodb-fuzzy-search')

module.exports = {

  before: {
    all: [
      search({
        fields: ['userId', 'quoteId', 'status'], 
        escape: false
      })
    ],
    find: [],
    get: [],
    create: [async context => {
      const {data: {userId, quoteId}} = context;
      const existingLike = await context.app.service('likes').find({
        query: {
          userId: {$search: userId},
          quoteId: {$search: quoteId}
        }
      });

      const data = existingLike.data[0];
      if (data) {
        throw new Error('You have already liked this quote')
      }
    }],
    update: [async context => {
      // update quote likeCount...
      const {data: {quoteId, status}} = context;
      const quote = await context.app.service('quotes').get(quoteId);
     
      if (!quote) {
        throw new Error('Error updating quote')
      }

      let data = Object.assign({}, quote); 
      data.updatedAt = Date.now(),
      data.likeCount = status? data.likeCount + 1 : data.likeCount - 1
      
      await context.app.service('quotes').update(quoteId, data);

      // update likes 
      context.data.updatedAt = Date.now()
    }],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [async context => {
      // update quote likeCount after creating new like
      const {data: {quoteId}} = context;
      const quote = await context.app.service('quotes').get(quoteId);
     
      const data = Object.assign({}, quote); 
      data.updatedAt = Date.now(),
      data.likeCount = data.likeCount++ || 1
      
      await context.app.service('quotes').update(quoteId, data);

      // emit an event using app.io
      context.app.service.emit('likes', 'created', {quoteId, data});
      // app.io.emit('authentication', Object.assign({}, hook.result));
    }],
    update: [async context => {

      const {data: {quoteId}} = context;
      const quote = await context.app.service('quotes').get(quoteId);
      const data = Object.assign({}, quote); 
      // emit an event using app.io
      context.app.io.emit('likes_updated', Object.assign({}, {quoteId, data}));
    }],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
