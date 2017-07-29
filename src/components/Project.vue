<template>
  <div class="box">
    <div class="content" v-if="tasks[0]">
      <h3>{{ project.name }}</h3>

      <table class="table" v-for="task in tasks">
        <thead>
          <tr>
            <th width="80%">{{ task.name }}</th>
            <th width="20%">{{ task.total }} hours</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="entry in task.entries">
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
        tasks: false,
      }
    },

    mounted() {
      entries.get(this.project).then(tasks => {
        this.tasks = tasks;
      });
    },
  }
</script>
