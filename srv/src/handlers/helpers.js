const {isEqual, isObject, transform} = require('lodash')

const specialCharFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?£]/ig;

const getUniqueLetters = (str) => {
  if (typeof str !== 'string') return ''
  return str.toLowerCase()
    .replace(specialCharFormat, '')
    .split('')
    .filter((el, ix, arr) => el.trim() && arr.indexOf(el) === ix)
    .join('')
}

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
const difference = (object, base) => {
	function changes(object, base) {
		return transform(object, function(result, value, key) {
			if (!isEqual(value, base[key])) {
				result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}

module.exports = {getUniqueLetters, difference}