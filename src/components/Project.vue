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

      <div class="select">
        <select v-model="contact" v-on:change="saveChoice" required>
          <option value="">
            Selecteer contact
          </option>

          <option v-for="(name, id) in contacts" v-bind:value="id" :key="id">
            {{ name }}
          </option>
        </select>
      </div>

      <button class="button is-warning" @click="invoice" v-bind:disabled="!contact">Factureer</button>
    </div>
  </div>
</template>

<style  lang="scss">
  .select select {
    max-width: 300px;
  }

  .select select:focus,
  .select select.is-focused,
  .select select:active,
  .select select.is-active {
    border-color: #b5b5b5;
  }

  .select:not(.is-multiple)::after {
    border-color: #363636 !important;
  }
</style>

<script>
  import contacts from '../lib/contacts';
  import entries from '../lib/entries';
  import moneybird from '../lib/moneybird';
  import Loader from './Loader.vue';

  export default {
    name: 'project',

    components: {
      'loader': Loader,
    },

    props: ['project', 'contacts'],

    data() {
      return {
        contact: contacts.getPreviousChoice(this.project.id),
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
          moneybird.createInvoice(this.entries, this.contact).then(response => {
            this.entries = false;
          });
        });
      },
      saveChoice() {
        contacts.save(this.contact, this.project.id);
      }
    }
  }
</script>
