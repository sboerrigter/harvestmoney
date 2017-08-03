import axios from 'axios';
import ClientOAuth2 from 'client-oauth2';
import env from '../../env.js';

class Moneybird
{
  constructor() {
    this.baseUrl = 'https://moneybird.com';
    this.currentUrl = new URL(document.location);

    console.log();

    this.moneybirdAuth = new ClientOAuth2({
      clientId: env.MONEYBIRD_CLIENT_ID,
      clientSecret: env.MONEYBIRD_CLIENT_SECRET,
      accessTokenUri: `${this.baseUrl}/oauth/token`,
      authorizationUri: `${this.baseUrl}/oauth/authorize`,
      redirectUri: this.currentUrl.origin,
      scopes: ['sales_invoices']
    })

    this.authenticate();
  }

  authenticate() {
    const code = this.currentUrl.searchParams.get('code');

    if (code) {
      return axios.request({
        method: 'post',
        baseURL: this.baseUrl,
        url: 'oauth/token',
        data: {
          client_id: env.MONEYBIRD_CLIENT_ID,
          client_secret: env.MONEYBIRD_CLIENT_SECRET,
          code: code,
          redirect_uri: this.currentUrl.origin,
          grant_type: 'authorization_code',
        }
      }).then(response => {
        console.log(response.data);
      });

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
    document.location.replace(this.moneybirdAuth.code.getUri());
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
