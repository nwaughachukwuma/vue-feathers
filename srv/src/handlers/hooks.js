const getUniqueLetters = require('./helpers')

module.exports = (context, method = 'creat') => {
    let hookMethod = method === 'create'? 'create': 'update';

    if (hookMethod === 'create') {
      context.data.createdAt = Date.now();
    } else {
      context.data.updatedAt = Date.now();
    }
    
    const quoteText = context.data.text
    if (quoteText && quoteText.length < 10) {
      throw new Error('This quote violates rule 1: Quotes cannot be less than 10 characters')
    }
    const uniqueLetters = getUniqueLetters(quoteText);
    if (uniqueLetters.length < 8) {
      throw new Error('This quote violates rule 2: Quotes must contain at least 8 unique letters')
    }
    console.log(`hook ${hookMethod} :==>>`, context.data)
    return context;
  }

// module.exports  = { hooksFunction }