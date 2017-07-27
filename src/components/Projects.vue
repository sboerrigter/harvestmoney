<template>
  <section class="section">
    <div class="container" v-if="projects">
      <h1 class="title">Uninvoiced billable hours</h1>

      <project v-for="project in projects" :project="project" :key="project.id"></project>
    </div>
  </section>
</template>

<script>
  import harvest from '../lib/harvest.js';
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
