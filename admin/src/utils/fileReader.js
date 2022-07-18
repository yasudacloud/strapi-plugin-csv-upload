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
      const data = await csvToJSON(fileReader.result, headers)
      resolve(data)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
    fileReader.readAsText(file)
  }))
}
