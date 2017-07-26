<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ sitename }}
        </h1>
        <h2 class="subtitle">
          {{ description }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'hero',

    data () {
      return {
        sitename: 'Harvest Money',
        description: 'Create MoneyBird invoices from Harvest reports'
      }
    }
  }
</script>
