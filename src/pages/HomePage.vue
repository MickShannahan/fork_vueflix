<script setup>
import { AppState } from '@/AppState.js';
import MovieCard from '@/components/MovieCard.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import SearchForm from '@/components/SearchForm.vue';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted } from 'vue';

// NOTE a page component in Vue should never have props, since there is no parent that will pass data down to a page component. Our pages have no parents (just like Batman)

const movies = computed(() => AppState.movies)
const searchQuery = computed(() => AppState.currentSearchQuery)

// NOTE onMounted is a lifecycle hook that will call its callback when this component is mounted into the view (visible in the App.vue)
onMounted(() => {
  logger.log('Home Page is mounted!');
  discoverMovies()
})

// NOTE onUnmounted will call it's callback function when the component is no longer mounted into the view
onUnmounted(() => {
  logger.log('Home Page is no longer mounted!')
  console.log('🪵 heres a log')
})

// NOTE our pages are generally responsible for making requests to get data that will be displayed on that page

async function discoverMovies() {
  try {
    await moviesService.discoverMovies()
  } catch (error) {
    Pop.error(error, 'COULD NOT DISCOVER MOVIES')
    // NOTE console statements in Vue will break the Vue application when the code is built and deployed, use logger instead
    logger.error('COULD NOT DISCOVER MOVIES', error)
  }
}

async function clearSearchQuery() {
  try {
    await moviesService.clearSearchQuery()
  } catch (error) {
    Pop.error(error, 'COULD NOT CLEAR')
    logger.error('COULD NOT CLEAR', error)
  }
}


</script>

<template>
  <div>
    <section class="container my-2">
      <div class="row">
        <div class="col-12">
          <h1 class="text-capitalize d-flex gap-2 align-items-center">
            <div v-if="searchQuery">
              <span @click="clearSearchQuery()" class="mdi mdi-close text-danger" title="Clear Search"
                role="button"></span>
              <span>{{ searchQuery.toLowerCase() }}</span>
            </div>
            <span>Movies</span>
          </h1>
        </div>
        <div class="col-12">
          <SearchForm />
        </div>
        <div class="col-12">
          <PageNavigation />
        </div>
      </div>
    </section>
    <section class="container">
      <div class="row">
        <div v-for="movie in movies" :key="movie.id" class="col-md-3">
          <!-- NOTE passes down each individual movie to a MovieCard component, so it can render a distinct component for each -->
          <!-- movieProp is the name of our prop, and movie is the value for that prop -->
          <MovieCard :movieProp="movie" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <PageNavigation />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
