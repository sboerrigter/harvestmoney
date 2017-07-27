<template>
  <section class="section">
    <div class="container" v-if="projects">
      <project v-for="project in projects" :project="project" :key="project.id"></project>
    </div>

    <div class="container" v-else>
      <loader></loader>
    </div>
  </section>
</template>

<script>
  import harvest from '../helpers/harvest.js';
  import Project from './Project.vue';
  import Loader from './Loader.vue';

  export default {
    name: 'projects',

    components: {
      'project': Project,
      'loader': Loader,
    },

    data() {
      return {
        projects: false,
      }
    },

    mounted() {
      harvest.getProjects().then(response => {
        this.projects = response;
      });
    },
  }
</script>
