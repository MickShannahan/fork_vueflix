<script setup>
import { AppState } from './AppState.js';
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <!-- NOTE "pages" will be injected into this RouterView component -->
    <RouterView />
  </main>
  <footer>
    <div class="text-center">Made with <span class="mdi mdi-heart"></span> by Jeremy</div>
  </footer>
</template>

<style lang="scss"></style>
