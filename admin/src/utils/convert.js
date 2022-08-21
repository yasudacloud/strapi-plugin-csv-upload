const csv = require("csvtojson");

/**
 * @param csvString
 * @param headers
 * @returns {Promise<unknown>}
 */
export async function csvToJSON(csvString, headers) {
  return new Promise((resolve, reject) => {
    const lines = []
    csv({
      quote: '"',
      noheader: true,
      headers
    }).fromString(csvString.trim()).on('data', (data) => {
      const jsonStr = data.toString('utf8')
      lines.push(JSON.parse(jsonStr))
    }).on('done', (error) => {
      if (error) {
        reject(error)
      } else {
        for (let line of lines) {
          if (Object.keys(line).length > headers.length) {
            reject('It is not possible to import more data than the number of headers.')
          }
        }
        resolve(lines)
      }
    })
  })
}

/**
 *
 * @param data
 * @param attribute
 * @returns {*}
 */
export function stringToContentType(data, attribute) {
  return data.map(params => {
    const castParams = {}
    for (const name in params) {
      const {type} = attribute[name]
      const isDefault = typeof params[name] === 'undefined' && typeof attribute[name].default === 'undefined'
      const value = isDefault ? attribute[name].default : params[name]
      if (type === 'boolean') {
        castParams[name] = value === 'true'
      } else if (type === 'integer') {
        const num = parseInt(value)
        if (isNaN(num)) {
          castParams[name] = undefined
        } else {
          castParams[name] = num
        }
      } else if (type === 'decimal') {
        const decimal = parseFloat(value)
        if (isNaN(decimal)) {
          castParams[name] = undefined
        } else {
          castParams[name] = decimal
        }
      } else if (type === 'string' || type === 'text') {
        castParams[name] = value === '' ? undefined : value
      } else {
        castParams[name] = value
      }
    }
    return castParams
  })
}

/**
 * @param str
 * @returns {string}
 */
function zeroPadding(str) {
  return ('00' + str).slice(-2)
}


/**
 * @param value
 * @param defaultValue
 * @returns {*}
 */
export function timeToFullTimeFormat(value, defaultValue) {
  if (typeof value === 'undefined' || value === '' || !value.includes(':')) {
    return defaultValue
  }
  const times = value.split(':')
  const hour = zeroPadding(times[0])
  const minute = zeroPadding(times[1])
  const second = times.length > 2 ? zeroPadding(times[2]) : '00'
  return `${hour}:${minute}:${second}.000`
}
