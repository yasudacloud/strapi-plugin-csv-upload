import {csvToJSON} from "./convert";

/**
 * @param file
 * @param headers
 * @returns {Promise<unknown>}
 */
export async function csvFileReader(file, headers) {
  return new Promise(((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const data = await csvToJSON(fileReader.result, headers)
        resolve(data)
      } catch (e) {
        reject(e)
      }
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
    fileReader.readAsText(file)
  }))
}
