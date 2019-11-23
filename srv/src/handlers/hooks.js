const getUniqueLetters = require('./helpers')
const { isEqual } = require('lodash')

module.exports = async (context, method = 'creat') => {
    let hookMethod = method === 'create'? 'create': 'update';

    if (hookMethod === 'create') {
      context.data.createdAt = Date.now();
    } else {
      context.data.updatedAt = Date.now();
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
    const result = await context.app.service('quotes').find();

    const rule3Message = 'This quote violates rule 3: Quote should not be plagiarised';
    const arch_result = await context.app.service('archived-quotes')
        .find({
            // query: {text: { $search: quoteText }},
            query: {$search: quoteText }
        }, {text: 1});
    if (arch_result.data.length) {
      throw new Error(rule3Message)
    }

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