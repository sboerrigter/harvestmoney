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
    const expireDate = parseInt(localStorage.getItem('harvest_access_token_expire'));
    const now = Date.now();

    console.log(expireDate && (expireDate < now));

    /* Get access token from LocalStorage */
    if (expireDate && (now < expireDate)) {
      return localStorage.getItem('harvest_access_token');
    }

    /* Get access token from URL */
    if (this.currentUrl.hash.includes('access_token')) {
      const accessToken = this.currentUrl.hash.split('access_token=')[1].split('&')[0];

      localStorage.setItem('harvest_access_token', accessToken);
      localStorage.setItem('harvest_access_token_expire', now + 86400);

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
      this.getAccessToken();
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
