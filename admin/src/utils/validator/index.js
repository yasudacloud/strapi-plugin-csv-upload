/**
 * @param value
 * @param attribute
 */
export function maxLength(value, attribute) {
  if (value.length > attribute.maxLength) {
    throw new Error('maxLength')
  }
}

/**
 * @param value
 * @param attribute
 */
export function minLength(value, attribute) {
  if (value.length < attribute.minLength) {
    throw new Error('minLength')
  }
}

export function maxValue(value, attribute) {
  if (attribute.type === 'decimal' || attribute.type === 'float') {
    const floatValue = parseFloat(value)
    if (floatValue > attribute.max) {
      throw new Error('Upper limit exceeded')
    }
    return floatValue
  } else if (attribute.type === 'integer') {
    const intValue = parseInt(value)
    if (intValue > attribute.max) {
      throw new Error('Upper limit exceeded')
    }
    return intValue
  } else {
    console.warn('Unsupported type validation@max')
    return ''
  }
}

export function minValue(value, attribute) {
  if (attribute.type === 'decimal' || attribute.type === 'float') {
    const floatValue = parseFloat(value)
    if (floatValue < attribute.min) {
      throw new Error('Lower limit is below')
    }
    return floatValue
  } else if (attribute.type === 'integer') {
    const intValue = parseInt(value)
    if (intValue < attribute.min) {
      throw new Error('Lower limit is below')
    }
    return intValue
  } else {
    console.warn('Unsupported type validation@min')
    return ''
  }
}

/**
 * @param value
 * @param attribute
 */
export function required(value, attribute) {
  if (value === '' || typeof value === 'undefined' || value === null) {
    throw new Error('required')
  }
}

/**
 * @param value
 * @param attribute
 */
export function email(value, attribute) {
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  if (!isEmail) {
    throw new Error('Incorrect format')
  }
}

/**
 * @param value
 * @param attribute
 */
export function enumeration(value, attribute) {
  const isArray = attribute.enum && typeof attribute.enum === 'object'
  if (isArray) {
    if (!attribute.enum.some(enumValue => enumValue === value)) {
      throw new Error('Invalid value')
    }
  }
}
