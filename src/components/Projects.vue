<template>
  <section class="section">
    <div class="container">
      <project v-for="project in projects" :project="project" :key="project.id"></project>
    </div>
  </section>
</template>

<script>
  import Harvest from '../helpers/harvest.js';
  import Project from './Project.vue';

  export default {
    name: 'projects',

    components: {
      'project': Project,
    },

    data() {
      return {
        projects: false,
      }
    },

    mounted() {
      const harvest = new Harvest();
      this.projects = harvest.getProjects();
    },
  }
</script>
