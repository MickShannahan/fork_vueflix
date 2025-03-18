<script setup>
import { AppState } from '@/AppState.js';
import MovieCard from '@/components/MovieCard.vue';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted } from 'vue';

const movies = computed(() => AppState.movies)

onMounted(() => {
  logger.log('Home Page is mounted!');
  discoverMovies()
})

onUnmounted(() => {
  logger.log('Home Page is no longer mounted!')
})

async function discoverMovies() {
  try {
    await moviesService.discoverMovies()
  } catch (error) {
    Pop.error(error, 'COULD NOT DISCOVER MOVIES')
    // NOTE console statements in Vue will break the Vue application when the code is built and deployed, use logger instead
    logger.error('COULD NOT DISCOVER MOVIES', error)
  }
}

</script>

<template>
  <div>
    <section class="container my-2">
      <div class="row">
        <div class="col-12">
          <h1>Movies</h1>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="row align-items-stretch">
        <div v-for="movie in movies" :key="movie.id" class="col-md-3">
          <MovieCard />
          <!-- <div class="shadow-lg mb-2 rounded">
            <img :src="movie.smallPosterImgUrl" :alt="'Poster for ' + movie.title" class="img-fluid rounded-top">
            <div class="p-2">
              <b>{{ movie.title }}</b>
              <div class="d-flex justify-content-between mt-2">
                <p
                  :class="{ 'text-success': movie.voteAverage >= 7, 'text-danger': movie.voteAverage < 5 && movie.voteCount > 0 }">
                  Rating: {{ movie.voteAverage.toFixed(1) }}
                </p>
                <p>
                  Votes: {{ movie.voteCount }}
                </p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
