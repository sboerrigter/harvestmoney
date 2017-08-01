import axios from 'axios';
import env from '../../env.js';

class Moneybird
{
  constructor() {
    this.clientId = env.MONEYBIRD_CLIENT_ID; // Should be declared in env.js
    this.clientSecret = env.MONEYBIRD_CLIENT_SECRET; // Should be declared in env.js
    this.accessToken = false;

    this.baseUrl = `https://moneybird.com`;

    this.authenticate();
  }

  authenticate() {
    const url = new URL(document.location);

    if (url.searchParams.get('code')) {
      /* Get access token from URL and save it to LocalStorage */
      const requestToken = url.searchParams.get('code');

      axios.request({
        method: 'post',
        baseURL: this.baseUrl,
        url: 'oauth/token',
        params: {
          'client_id': this.clientId,
          'client_secret': this.clientSecret,
          'code': requestToken,
          'redirect_uri': document.location.origin,
          'grant_type': 'authorization_code',
        },
      }).then(response => {
        console.log(response.data);
      })

      localStorage.setItem('moneybird_access_token', this.accessToken);
    } else if (localStorage.getItem('moneybird_access_token') !== null) {
      /* Get access token from LocalStorage */
      this.accessToken = localStorage.getItem('moneybird_access_token');
    } else {
      /* Get new access token */
      this.getRequestToken();
    }
  }

  getRequestToken() {
    document.location.replace(
      this.baseUrl
      + '/oauth/authorize?client_id='
      + this.clientId
      + '&redirect_uri='
      + document.location.origin
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
      // this.getAccessToken();
    });
  }

  getInvoices() {
    return this.get('sales_invoices').then(projects => {
      return projects;
    });
  }
}

const moneybird = new Moneybird();

export default moneybird;
