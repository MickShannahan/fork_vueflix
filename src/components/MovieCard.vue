<!-- NOTE emmet abbreviation for new Vue component is vt:basic -->
<script setup>
import { Movie } from '@/models/Movie.js';

// NOTE props allow us to pass down values from a parent component to a child component
defineProps({
  // NOTE the type for our prop will be a Movie object
  // NOTE the required property will give you a warning in the console if you do not pass down a value for the prop
  movieProp: { type: Movie, required: true },
})
</script>


<template>
  <div class="shadow-lg mb-2 rounded">
    <img :src="movieProp.smallPosterImgUrl" :alt="'Poster for ' + movieProp.title" class="img-fluid rounded-top">
    <div class="p-2">
      <b>{{ movieProp.title }}</b>
      <div class="d-flex justify-content-between mt-2">
        <p
          :class="{ 'text-success': movieProp.voteAverage >= 7, 'text-danger': movieProp.voteAverage < 5 && movieProp.voteCount > 0 }">
          Rating: {{ movieProp.voteAverage.toFixed(1) }}
        </p>
        <p>
          Votes: {{ movieProp.voteCount }}
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
