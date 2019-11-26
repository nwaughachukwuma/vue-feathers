const specialCharFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?£]/ig;

const getUniqueLetters = (str) => {
  if (typeof str !== 'string') return ''
  return str.toLowerCase()
    .replace(specialCharFormat, '')
    .split('')
    .filter((el, ix, arr) => el.trim() && arr.indexOf(el) === ix)
    .join('')
}

module.exports = {getUniqueLetters}