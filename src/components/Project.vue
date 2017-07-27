<template>
  <div class="box" v-if="entries[0]">
    <div class="content">
      <h3>{{ project.name }}</h3>

      <div v-for="task in tasks">
        {{ task.name }}
      </div>

      <table class="table">
        <thead>
          <tr>
            <th width="20%">Meerwerk</th>
            <th width="60%">Description</th>
            <th width="20%">Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in entries">
            <td width="20%">{{ entry.formatted_date }}</td>

            <td v-if="entry.notes" width="60%">{{ entry.notes }}</td>
            <td v-else width="60%"><em>No description</em></td>

            <td width="20%">{{ entry.hours }} hours</td>
          </tr>
        </tbody>
      </table>

      <a class="button is-warning" href="#">Invoice</a>
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

    props: ['project', 'tasks'],

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
