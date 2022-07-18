import axiosInstance from "./axiosInstance";

/**
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function fetchContentTypeRequest() {
  return axiosInstance.get('/content-type-builder/content-types')
}


/**
 * @param uid
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function saveRequest(uid, params) {
  return axiosInstance.post(`/content-manager/collection-types/${uid}`,
    params,
    {
      validateStatus: () => true
    })
}
