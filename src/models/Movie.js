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
    this.voteAverage = data.vote_average ?? 0
    this.voteCount = data.vote_count ?? 0
  }

  baseURL = 'https://image.tmdb.org/t/p/'

  get largeBackdropImgUrl() {
    return this.baseURL + 'original' + this.backdropPath
  }
  get largePosterImgUrl() {
    return this.baseURL + 'original' + this.posterPath
  }
  get smallBackdropImgUrl() {
    return this.baseURL + 'w500' + this.backdropPath
  }
  get smallPosterImgUrl() {
    return this.baseURL + 'w500' + this.posterPath
  }
}