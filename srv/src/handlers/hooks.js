const {getUniqueLetters, difference} = require('./helpers')
const {isEmpty, get, intersection} = require('lodash');

const blockUpdateForLikesOnFields = ['author', 'text', 'userId', '_id']

module.exports = async (context, method = 'create') => {
    let hookMethod = method === 'create'? 'create': 'update';

    let diff = {}, dbQuote = {}
    if (hookMethod === 'update') {
      dbQuote = await context.app.service('quotes').get(context.id)
      diff = difference(context.data, dbQuote);
    }

    let canUpdate = undefined;
    canUpdate = intersection(
      blockUpdateForLikesOnFields, Object.keys(diff)
    );

    // const user = context.params.user;
    const userId = get(context.params, 'payload.userId', undefined);
    if (!isEmpty(canUpdate) && !userId) {
      throw new Error(`You are not permitted to ${hookMethod} a quote`)
    }
    
    if (hookMethod === 'create') {
      context.data.createdAt = Date.now();
      context.data.userId = userId;
    } else {
      // check that quote belongs to the authenticated user
      if (!isEmpty(canUpdate) && dbQuote.userId !== userId) {
        throw new Error(`Yout are not permitted to ${hookMethod} a quote`) 
      }
      context.data.updatedAt = Date.now();
      context.data.edited = true
    }
    
    const quoteText = context.data.text;
    // text 1
    if (quoteText && quoteText.length < 10) {
      throw new Error('This quote violates rule 1: Quotes cannot be less than 10 characters')
    }
    // text 2:
    const uniqueLetters = getUniqueLetters(quoteText);
    if (uniqueLetters.length < 8) {
      throw new Error('This quote violates rule 2: Quotes must contain at least 8 unique letters')
    }

    // text 3: check plagiarism
    const rule3Message = 'This quote violates rule 3: Quote should not be plagiarised';
    const arch_result = await context.app.service('archived-quotes')
        .find({
            // query: {text: { $search: quoteText }},
            query: {$search: quoteText }
        }, {text: 1});
    if (arch_result.data.length) {
      throw new Error(rule3Message)
    }

    const result = await context.app.service('quotes').find();
    const previousQuotes = result.data;
    const currentQuote = context.data;
    previousQuotes.forEach( quote => {
        const firstThreeWordsinQuote = quote.text.split(' ').slice(0,3).join(' ');
        const firstThreeWordsinCurrentQuote = currentQuote.text.split(' ').slice(0,3).join(' ')
        // console.log('quotes comparison :=>>', quote._id, context.id) //, firstThreeWordsinQuote, firstThreeWordsinCurrentQuote)
        if (quote._id != context.id) {
            if (firstThreeWordsinQuote === firstThreeWordsinCurrentQuote) {
                throw new Error(rule3Message)
            }
        }
    })

    console.log(`hook ${hookMethod} :==>>`, currentQuote)
    return context;
}