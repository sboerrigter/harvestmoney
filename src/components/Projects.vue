<template>
  <section class="section">
    <div class="container" v-if="projects">
      <h1 class="title">Uninvoiced billable hours</h1>

      <project v-for="project in projects" :project="project" :key="project.id"></project>
    </div>

    <div class="container" v-else>
      <loader></loader>
    </div>
  </section>
</template>

<script>
  import projects from '../lib/projects.js';
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
        projects: false
      }
    },

    mounted() {
      projects.get().then(projects => {
        this.projects = projects;
      });
    },
  }
</script>
