export class Movie {
  constructor(data) {
    this.backdropPath = data.backdrop_path
    this.posterPath = data.poster_path
    this.id = data.id
    this.originalTitle = data.original_title
    this.overview = data.overview
    this.popularity = data.popularity
    this.releaseDate = new Date(data.release_date)
    this.title = data.title
    this.voteAverage = data.vote_average
    this.voteCount = data.vote_count
  }

  baseURL = 'https://image.tmdb.org/t/p/'

  get backdropImgUrl() {
    return this.baseURL + this.backdropPath
  }
  get posterImgUrl() {
    return this.baseURL + this.posterPath
  }
}