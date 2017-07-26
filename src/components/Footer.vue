<template>
  <footer class="hero is-light">
    <div class="hero-body container">
      <div class="content has-text-centered">
        <p>
          Harvest Money is buildt by <strong><a :href="url" target="_blank">{{ author }}</a></strong> to make his own live easier :-)
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer',

    data () {
      return {
        author: 'Sjoerd Boerrigter',
        url: 'http://sjoerdboerrigter.nl/',
      }
    }
  }
</script>
