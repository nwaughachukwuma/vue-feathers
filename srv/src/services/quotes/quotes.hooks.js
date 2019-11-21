
const getUniqueLetters = (str) => {
  if (typeof str !== 'string') return ''
  return str.toLowerCase().split('')
    .filter((el, ix, arr) => el.trim() && arr.indexOf(el) === ix)
    .join('')
}

module.exports = {
  before: {
    all: [],
    find: [async (context) => {
      console.log('find method context :==> ', context)
    }],
    get: [],
    create: [async (context) => {
      context.data.createdAt = Date.now();
      const quoteText = context.data.text
      if (quoteText && quoteText.length < 10) {
        throw new Error('This quote violates rule 1: Quotes cannot be less than 10 characters')
      }
      const uniqueLetters = getUniqueLetters(str);
      if (uniqueLetters.length < 8) {
        throw new Error('This quote violates rule 2: Quotes must contain at least 8 unique letters')
      }
      console.log('hook create :==>>', context.data)
      return context;
    }],
    update: [async (context) => {
      context.data.updatedAt = Date.now();
      const quoteText = context.data.text
      if (quoteText && quoteText.length < 10) {
        throw new Error('This quote violates rule 1: Quotes cannot be less than 10 characters')
      }
      const uniqueLetters = getUniqueLetters(str);
      if (uniqueLetters.length < 8) {
        throw new Error('This quote violates rule 2: Quotes must contain at least 8 unique letters')
      }
      console.log('hook update :==>>', context.data)
      return context;
    }],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
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
