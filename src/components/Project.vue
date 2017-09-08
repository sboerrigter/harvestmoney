<template>
  <div class="box" v-if="entries[0]">
    <div class="content">
      <h3>{{ project.name }}</h3>

      <table class="table" v-for="task in entries">
        <thead>
          <tr>
            <th width="80%">{{ task.name }}</th>

            <th width="20%">{{ task.total.toLocaleString('nl') }} uur</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="entry in task.entries">
              <td v-if="entry.notes" width="80%">{{ entry.date }} - {{ entry.notes }}</td>
              <td v-else width="80%">{{ entry.date }} - <em>Geen omschrijving</em></td>

              <td width="20%">{{ entry.hours.toLocaleString('nl') }} uur</td>
          </tr>
        </tbody>
      </table>

      <button class="button is-warning" @click="invoice()" href="#">Factureer</button>
    </div>
  </div>
</template>

<script>
  import entries from '../lib/entries';
  import moneybird from '../lib/moneybird';
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
      entries.get(this.project).then(entries => {
        this.entries = entries;
      });
    },

    methods: {
      invoice() {
        entries.get(this.project).then(entries => {
          moneybird.createInvoice(this.entries);
        });
      }
    }
  }
</script>
