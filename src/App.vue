<template>
  <div id="app">
    <app-header></app-header>

    <projects></projects>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import tasks from './lib/tasks.js';
  import Header from './components/Header.vue';
  import Projects from './components/Projects.vue';
  import Footer from './components/Footer.vue';

  tasks.init();

  export default {
    name: 'app',

    components: {
      'app-header': Header,
      'projects': Projects,
      'app-footer': Footer,
    },
  }
</script>
