<script setup>
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';


const editableSearch = ref('')

async function searchMovies() {
  try {
    logger.log('searching for', editableSearch.value)
    await moviesService.searchMovies(editableSearch.value)
  } catch (error) {
    Pop.error(error, 'COULD NOT SEARCH')
    logger.error('COULD NOT SEARCH', error)
  }
}

</script>


<template>
  <form @submit.prevent="searchMovies()">
    <div class="input-group mb-3">
      <input v-model="editableSearch" type="text" class="form-control" placeholder="Movie Title"
        aria-label="Movie Title" aria-describedby="searchButton">
      <button class="btn btn-indigo" type="submit" id="searchButton">
        Search <span class="mdi mdi-magnify"></span>
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>