import Vue from 'vue';
import App from './App.vue';

// import moneybird from './lib/moneybird';
// console.log(moneybird.getInvoices());

new Vue({
  el: '#app',
  render: create => create(App)
})
