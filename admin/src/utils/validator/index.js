/**
 * @param value
 * @param attribute
 */
function maxLength(value, attribute) {
  if (value.length > attribute.maxLength) {
    throw new Error('maxLength')
  }
}

/**
 * @param value
 * @param attribute
 */
function minLength(value, attribute) {
  if (value.length < attribute.minLength) {
    throw new Error('minLength')
  }
}

/**
 * @param value
 * @param attribute
 */
function required(value, attribute) {
  if (value === '' || typeof value === 'undefined' || value === null) {
    throw new Error('required')
  }
}

export default {
  maxLength,
  minLength,
  required
}
