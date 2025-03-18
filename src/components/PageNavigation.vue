<script setup>
import { AppState } from '@/AppState.js';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';


const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function changePage(pageNumber) {
  try {
    logger.log('Changing to page ' + pageNumber);
    const searchQuery = AppState.currentSearchQuery
    if (!searchQuery) { // if (searchQuery == '') {
      await moviesService.changeDiscoverPage(pageNumber)
    }
    else {
      await moviesService.changeSearchPage(searchQuery, pageNumber)
    }
  } catch (error) {
    Pop.error(error, 'COULD NOT CHANGE PAGE')
    logger.error('COULD NOT CHANGE PAGE', error)
  }
}

</script>


<template>
  <div class="d-flex gap-3 align-items-center mt-2">
    <button @click="changePage(currentPage - 1)" class="btn btn-indigo fs-5" type="button" :disabled="currentPage <= 1">
      Previous
    </button>
    <p class="fs-4 mb-0">Page {{ currentPage }} of {{ totalPages }}</p>
    <button @click="changePage(currentPage + 1)" class="btn btn-indigo fs-5" type="button"
      :disabled="currentPage == totalPages || currentPage == 500">
      Next
    </button>
  </div>
</template>


<style lang="scss" scoped></style>