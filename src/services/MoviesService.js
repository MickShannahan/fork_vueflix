import { logger } from "@/utils/Logger.js"
import { movieApi } from "./AxiosService.js"
import { Movie } from "@/models/Movie.js"
import { AppState } from "@/AppState.js"

class MoviesService {

  async discoverMovies() {
    const response = await movieApi.get('discover/movie')
    logger.log('GOT MOVIES 🎥🍿🎞️', response.data)
    this.handleResponse(response)
  }
  async changeDiscoverPage(pageNumber) {
    const response = await movieApi.get(`discover/movie?page=${pageNumber}`)
    logger.log('CHANGED PAGE 📖', response.data)
    this.handleResponse(response)
  }
  async searchMovies(searchQuery) {
    const response = await movieApi.get(`search/movie?query=${searchQuery}`)
    logger.log('SEARCHING MOVIES 🔍', response.data)
    this.handleResponse(response)
    AppState.currentSearchQuery = searchQuery
  }


  async changeSearchPage(searchQuery, pageNumber) {
    logger.log(`going to page ${pageNumber} for ${searchQuery} movies`)
    const response = await movieApi.get(`search/movie?query=${searchQuery}&page=${pageNumber}`)
    logger.log('CHANGING SEARCH PAGE 🔍', response.data)
    this.handleResponse(response)
  }

  async clearSearchQuery() {
    AppState.currentSearchQuery = ''
    await this.discoverMovies()
  }

  handleResponse(response) {
    const movies = response.data.results.map(pojo => new Movie(pojo))
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
    // NOTE use your Vue tools to inspect the data in your appstate and make sure it looks correct
  }
}

export const moviesService = new MoviesService()