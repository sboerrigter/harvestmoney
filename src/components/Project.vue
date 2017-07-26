<template>
  <div class="box">
    <div class="content">
      <h3>{{ project.name }}</h3>

      <pre>{{ project }}</pre>

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
