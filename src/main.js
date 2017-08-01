import Vue from 'vue';
import App from './App.vue';
import Harvest from './lib/harvest.js';

Harvest.authenticate();

new Vue({
  el: '#app',
  render: create => create(App)
})
