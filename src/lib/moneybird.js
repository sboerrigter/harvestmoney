import axios from 'axios';
import env from '../../env.js';

class Moneybird
{
  constructor() {
    this.clientId = env.MONEYBIRD_CLIENT_ID; // Should be declared in env.js
    this.clientSecret = env.MONEYBIRD_CLIENT_SECRET; // Should be declared in env.js

    this.baseUrl = 'https://moneybird.com';
    this.currentUrl = new URL(document.location);

    this.accessToken = this.getAccessToken();
  }

  getAccessToken() {
    /* Get access token from LocalStorage */
    if (localStorage.getItem('moneybird_access_token') !== null) {
      return localStorage.getItem('moneybird_access_token');
    }

    /* Get access token from requestToken */
    const requestToken = this.currentUrl.searchParams.get('code');

    console.log(requestToken);

    if (requestToken !== null) {
      return axios.request({
        method: 'post',
        baseURL: this.baseUrl,
        url: 'oauth/token',
        params: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: requestToken,
          redirect_uri: this.currentUrl.origin,
          grant_type: 'authorization_code',
        },
        headers: {
          'Content-Type': 'text/plain',
        }
      }).then(response => {
        localStorage.setItem('moneybird_access_token', response.data.access_token);

        return response.data.access_token;
      });
    }

    /* Get a new requestToken */
    this.getRequestToken();
  }

  getRequestToken() {
    document.location.replace(
      this.baseUrl
      + '/oauth/authorize?client_id='
      + this.clientId
      + '&redirect_uri='
      + this.currentUrl.origin
      + '&response_type=code'
    );
  }

  get(endpoint, params = {}) {
    return axios.request({
      method: 'get',
      baseURL: this.baseUrl,
      url: endpoint,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken,
      }
    }).then(response => {
      return response.data;
    }).catch((error) => {
      this.getRequestToken();
    });
  }

  getInvoices() {
    return this.get('sales_invoices').then(response => {
      return response;
    });
  }
}

const moneybird = new Moneybird();

export default moneybird;
