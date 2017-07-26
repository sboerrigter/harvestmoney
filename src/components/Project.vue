<template>
  <div class="box">
    <div class="content">
      <h3>{{ project.name }}</h3>

      <a class="button is-primary" :href="project.link">Invoice</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'project',

    props: ['project'],
  }
</script>
