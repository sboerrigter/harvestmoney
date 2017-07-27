<template>
  <div class="box">
    <div class="content" v-if="hours">
      <h3>{{ project.name }}</h3>

      <pre>{{ hours }}</pre>

      <a class="button is-warning" href="#">Invoice</a>
    </div>

    <div class="content" v-else>
      <loader></loader>
    </div>
  </div>
</template>

<script>
  import harvest from '../helpers/harvest.js';
  import Loader from './Loader.vue';

  export default {
    name: 'project',

    components: {
      'loader': Loader,
    },

    props: ['project'],

    data() {
      return {
        hours: false,
      }
    },

    mounted() {
      harvest.getProjectHours(this.project.id).then(response => {
        this.hours = response;
      });
    },
  }
</script>
