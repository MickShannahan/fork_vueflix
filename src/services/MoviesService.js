import { logger } from "@/utils/Logger.js"
import { movieApi } from "./AxiosService.js"
import { Movie } from "@/models/Movie.js"
import { AppState } from "@/AppState.js"

class MoviesService {
  async discoverMovies() {
    const response = await movieApi.get('discover/movie')
    logger.log('GOT MOVIES 🎥🍿🎞️', response.data)
    const movies = response.data.results.map(pojo => new Movie(pojo))
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
    // NOTE use your Vue tools to inspect the data in your appstate and make sure it looks correct
  }
}

export const moviesService = new MoviesService()