<template>
  <div class="box">
    <div class="content" v-if="entries[0]">
      <h3>{{ project.name }}</h3>

      <table class="table" v-for="task in project.tasks">
        <thead>
          <tr>
            <th width="80%">{{ task.name }}</th>
            <th width="20%">Hours</th>
          </tr>
        </thead>
        <tbody v-for="entry in entries">
          <tr v-if="entry.task_id == task.id">
              <td v-if="entry.notes" width="80%">{{ entry.date }} - {{ entry.notes }}</td>
              <td v-else width="80%">{{ entry.date }} - <em>No description</em></td>

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
