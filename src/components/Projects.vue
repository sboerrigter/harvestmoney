<template>
  <section class="section">
    <div class="container">
      <project v-for="project in projects" :project="project" :key="project.id"></project>
    </div>
  </section>
</template>

<script>
  import Project from './Project.vue';

  export default {
    name: 'projects',

    components: {
      'project': Project,
    },

    data() {
      return {
        projects: [
          {
            id: 1,
            name: "Project naam",
            uninvoiced: 53.5,
            link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
          },
          {
            id: 1,
            name: "Nog ene project",
            uninvoiced: 53.5,
            link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
          },
          {
            id: 1,
            name: "Derde project",
            uninvoiced: 53.5,
            link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
          },
          {
            id: 1,
            name: "Project",
            uninvoiced: 53.5,
            link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
          },
          {
            id: 1,
            name: "Project",
            uninvoiced: 53.5,
            link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
          }
        ]
      }
    }
  }
</script>
