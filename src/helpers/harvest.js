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
    /**
     * Check LocalStorage for access token
     */
    if (localStorage.getItem('harvest_access_token') !== null) {
      this.accessToken = localStorage.getItem('harvest_access_token');

      return this.accessToken;

    /**
     * Check URL for access token and save it
     */
   } else if (document.location.hash) {
      this.accessToken = document.location.hash.split('access_token=')[1].split('&')[0]

      localStorage.setItem('harvest_access_token', this.accessToken);

      return this.accessToken;

    /**
     * Redirect to Harvest authentication page to get new access token
     */
    } else {

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

  getProjects() {
    return axios.request({
      url: `${this.baseUrl}/projects?access_token=${this.accessToken}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response.data);

      return response.data;
    });
  }
}
