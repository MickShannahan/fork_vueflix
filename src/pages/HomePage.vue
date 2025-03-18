<script setup>
import { AppState } from '@/AppState.js';
import MovieCard from '@/components/MovieCard.vue';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted } from 'vue';

const movies = computed(() => AppState.movies)
const totalPages = computed(() => AppState.totalPages)
const currentPage = computed(() => AppState.currentPage)

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

function changePage(pageNumber) {
  console.log('Changing to page ' + pageNumber);

}

</script>

<template>
  <div>
    <section class="container my-2">
      <div class="row">
        <div class="col-12">
          <h1>Movies</h1>
        </div>
        <div class="col-12">
          <div class="d-flex gap-3 align-items-center mt-2">
            <button @click="changePage(currentPage - 1)" class="btn btn-indigo fs-5" type="button">
              Previous
            </button>
            <p class="fs-4 mb-0">Page {{ currentPage }} of {{ totalPages }}</p>
            <button @click="changePage(currentPage + 1)" class="btn btn-indigo fs-5" type="button">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="row">
        <div v-for="movie in movies" :key="movie.id" class="col-md-3">
          <MovieCard :movieProp="movie" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
