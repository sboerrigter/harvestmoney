<template>
  <hero></hero>
</template>

<script>
  import Hero from './components/Hero.vue';

  export default {
    name: 'app',

    components: {
      'hero': Hero,
    },
  }
</script>
