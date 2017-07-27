import axios from 'axios';
import env from '../../env.js';

export default class Harvest {

  constructor() {
    this.account = env.HARVEST_ACCOUNT; // Should be declared in env.js
    this.clientId = env.HARVEST_CLIENT_ID; // Should be declared in env.js
    this.clientSecret = env.HARVEST_CLIENT_SECRET; // Should be declared in env.js
    this.accessToken = false;

    this.baseUrl = `https://${this.account}.harvestapp.com`;

    this.authenticate();
  }

  authenticate() {
    if (localStorage.getItem('harvest_access_token') !== null) {
      /* Get access token from LocalStorage */
      this.accessToken = localStorage.getItem('harvest_access_token');
    } else if (document.location.hash) {
      /* Get access token from URL and save it to LocalStorage */
      this.accessToken = document.location.hash.split('access_token=')[1].split('&')[0];
      localStorage.setItem('harvest_access_token', this.accessToken);
    } else {
      /* Redirect to Harvest authentication page */
      document.location.replace(
        this.baseUrl
        + '/oauth2/authorize?client_id='
        + this.clientId
        + '&redirect_uri='
        + document.location.origin
        + '&response_type=token'
      );
    }
  }

  get(endpoint) {
    return axios.request({
      method: 'get',
      url: `${this.baseUrl}/${endpoint}?access_token=${this.accessToken}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      return response.data;
    });
  }

  getProjects() {
    return this.get('projects').then(results => {
      const projects = [];
      results.forEach(result => projects.push(result.project));
      return projects;
    });
  }
}
