<template>
  <div class="box">
    <div class="content" v-if="entries[0].day_entry">
      <h3>{{ project.name }}</h3>

      <table class="table">
        <thead>
          <tr>
            <th width="80%">Description</th>
            <th width="20%">Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in entries">
            <td v-if="entry.day_entry.notes" width="80%">{{ entry.day_entry.notes }}</td>
            <td v-else width="20%"><em>No description</em></td>
            <td>{{ entry.day_entry.hours }} hours</td>
          </tr>
        </tbody>
      </table>

      <a class="button is-warning" href="#">Invoice</a>
    </div>

    <div class="content" v-else>
      <loader></loader>
    </div>
  </div>
</template>

<script>
  import harvest from '../lib/harvest.js';
  import Loader from './Loader.vue';

  export default {
    name: 'project',

    components: {
      'loader': Loader,
    },

    props: ['project'],

    data() {
      return {
        entries: false,
      }
    },

    mounted() {
      harvest.getEntries(this.project.id).then(response => {
        this.entries = response;
      });
    },
  }
</script>
