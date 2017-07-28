<template>
  <div class="box">
    <div class="content" v-if="entries[0]">
      <h3>{{ project.name }}</h3>

      <table class="table">
        <thead>
          <tr>
            <th width="20%">Date</th>
            <th width="60%">Description</th>
            <th width="20%">Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in entries">
              <td width="20%">{{ entry.date }}</td>

              <td v-if="entry.notes" width="60%">{{ entry.notes }}</td>
              <td v-else width="60%"><em>No description</em></td>

              <td width="20%">{{ entry.hours }} hours</td>
          </tr>
        </tbody>
      </table>

      <a class="button is-warning" href="#">Invoice</a>
    </div>

    <div class="content" v-else>
      <h3>{{ project.name }}</h3>

      <loader></loader>
    </div>
  </div>
</template>

<script>
  import entries from '../lib/entries.js';
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
      entries.get(this.project).then(response => {
        this.entries = response;
      });
    },
  }
</script>
