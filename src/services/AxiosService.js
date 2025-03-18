import Axios from 'axios'
import { baseURL } from '../env.js'
import { logger } from '../utils/Logger.js'

// NOTE only use this instance of axios for interacting with the sandbox API OR your own API
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

api.interceptors.request.use(config => config, handleAxiosError)
api.interceptors.response.use(response => response, handleAxiosError)

export const movieApi = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 3000
})

function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]', error.message)
  }
  return Promise.reject(error)
}
