import axios from 'axios';
import date from './date.js';
import env from '../../env.js';

class Harvest
{
  constructor() {
    this.account = env.HARVEST_ACCOUNT; // Should be declared in env.js
    this.clientId = env.HARVEST_CLIENT_ID; // Should be declared in env.js
    this.clientSecret = env.HARVEST_CLIENT_SECRET; // Should be declared in env.js
    this.accessToken = false;

    this.baseUrl = `https://${this.account}.harvestapp.com`;

    this.authenticate();
  }

  authenticate() {
    if (document.location.hash) {
      /* Get access token from URL and save it to LocalStorage */
      this.accessToken = document.location.hash.split('access_token=')[1].split('&')[0];
      localStorage.setItem('harvest_access_token', this.accessToken);
    } else if (localStorage.getItem('harvest_access_token') !== null) {
      /* Get access token from LocalStorage */
      this.accessToken = localStorage.getItem('harvest_access_token');
    } else {
      /* Get new access token */
      this.getAccessToken();
    }
  }

  getAccessToken() {
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
    return this.get('projects').then(projects => {
      return projects;
    });
  }

  getTasks() {
    return this.get(`tasks`).then(tasks => {
      return tasks;
    });
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
