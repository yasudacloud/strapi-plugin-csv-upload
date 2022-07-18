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
 * @param data
 * @param attributeTypes
 * @returns {*}
 */
export function stringToContentType(data, attributeTypes) {
  return data.map(params => {
    const castParams = {}
    for (const attributeName in params) {
      if (attributeTypes[attributeName] === 'boolean') {
        castParams[attributeName] = params[attributeName] === 'true'
      } else if (attributeTypes[attributeName] === 'integer') {
        castParams[attributeName] = parseInt(params[attributeName])
      } else {
        castParams[attributeName] = params[attributeName]
      }
    }
    return castParams
  })
}
