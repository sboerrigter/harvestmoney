import axios from 'axios';
import date from './date.js';
import env from '../../env.js';

class Harvest
{
  constructor() {
    this.account = env.HARVEST_ACCOUNT; // Should be declared in env.js
    this.clientId = env.HARVEST_CLIENT_ID; // Should be declared in env.js

    this.baseUrl = `https://${this.account}.harvestapp.com`;
    this.currentUrl = new URL(document.location);

    this.accessToken = false;
    this.accessToken = this.getAccessToken();
  }

  getAccessToken() {
    /* Get access token from LocalStorage */
    if (localStorage.getItem('harvest_access_token') !== null) {
      return localStorage.getItem('harvest_access_token');
    }

    /* Get access token from URL */
    if (this.currentUrl.hash.includes('access_token')) {
      const accessToken = this.currentUrl.hash.split('access_token=')[1].split('&')[0];

      localStorage.setItem('harvest_access_token', accessToken);

      return accessToken;
    }

    /* Get a new access token */
    this.getNewAccessToken();
  }

  getNewAccessToken() {
    document.location.replace(
      this.baseUrl
      + '/oauth2/authorize?client_id='
      + this.clientId
      + '&redirect_uri='
      + document.location.origin
      + '&response_type=token'
    );
  }

  get(endpoint, params = {}) {
    return axios.request({
      method: 'get',
      baseURL: this.baseUrl,
      url: endpoint,
      params: Object.assign({'access_token': this.accessToken}, params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      return response.data;
    }).catch((error) => {
      this.getNewAccessToken();
    });
  }

  getProjects() {
    return this.get('projects');
  }

  getTasks() {
    return this.get('tasks');
  }

  getEntries(id) {
    const params = {
      'billable': 'yes',
      'only_unbilled': 'yes',
      'from': '20170101',
      'to': date.getLastDayOfPreviousMonth(),
    }

    return this.get(`projects/${id}/entries`, params).then(entries => {
      return entries;
    });
  }
}

const harvest = new Harvest();

export default harvest;
