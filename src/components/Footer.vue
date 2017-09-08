<template>
  <footer class="hero is-dark">
    <div class="hero-body container">
      <div class="content has-text-centered">
        <p>
          Harvest Money is gemaakt door <strong><a :href="url" target="_blank">{{ author }}</a></strong>  om zijn eigen leven makkelijker te maken 😊
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer',

    data() {
      return {
        author: 'Sjoerd Boerrigter',
        url: 'http://sjoerdboerrigter.nl/',
      }
    }
  }
</script>
