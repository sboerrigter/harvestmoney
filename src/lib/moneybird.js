import axios from 'axios';
import date from './date.js';
import env from '../../env.js';

class Moneybird
{
  constructor() {
    this.clientId = env.MONEYBIRD_CLIENT_ID; // Should be declared in env.js
    this.clientSecret = env.MONEYBIRD_CLIENT_SECRET; // Should be declared in env.js
    this.administrationId = env.MONEYBIRD_ADMINISTRATION_ID; // Should be declared in env.js

    this.baseUrl = 'https://moneybird.com';
    this.currentUrl = new URL(document.location);

    this.accessToken = this.getAccessToken();

    this.hourlyRate = '85';
  }

  createName(contact) {
    const name = (contact.firstname && contact.lastname) ? `${contact.firstname} ${contact.lastname}` : contact.firstname;
    let label;

    if (contact.company_name) {
      label = (name) ? `${contact.company_name} (${name})` : contact.company_name;
    } else if (name) {
      label = name;
    } else {
      label = contact.firstname;
    }

    return label;
  }

  getAccessToken() {
    const expireDate = parseInt(localStorage.getItem('moneybird_access_token_expire'));
    const now = Date.now();

    /* Get access token from LocalStorage */
    if (expireDate && (expireDate < now)) {
      return localStorage.getItem('moneybird_access_token');
    }

    /* Get access token from requestToken */
    const requestToken = this.currentUrl.searchParams.get('code');

    if (requestToken !== null) {
      alert('Nu moet je die CORS plugin aanzetten');

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
        localStorage.setItem('moneybird_access_token_expire', now + 86400);

        return response.data.access_token;
      });
    }

    /* Get a new request token */
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

  getContacts() {
    const contacts = {};
    const url = `${this.baseUrl}/api/v2/${this.administrationId}/contacts?per_page=100`;

    return new Promise(resolve => {
      const get = (page = 1) => {
        return axios(`${url}&page=${page}`, { headers: this.getHeaders() }).then(res => {
          if (!res.data.length) {
            resolve(contacts);
            return;
          }

          res.data.forEach(contact => {
            contacts[contact.id] = this.createName(contact);
          });

          get(++page);
        });
      };

      get();
    });
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
    };
  }

  post(endpoint, params = {}) {
    return axios.request({
      method: 'post',
      baseURL: this.baseUrl,
      url: `api/v2/${this.administrationId}/${endpoint}`,
      data: params,
      headers: this.getHeaders(),
    }).then(response => {
      return response.data;
    }).catch((error) => {
      this.getRequestToken();
    });
  }

  createInvoice(entries, id) {
    return this.post('sales_invoices', {
      'sales_invoice': {
        'reference': `Uren ${date.getLastMonthName()} 2017`,
        'contact_id': id,
        'details_attributes': this.formatEntries(entries),
      }
    });
  }

  formatEntries(entries) {
    const output = [];

    entries.forEach(task => {
      if (task.name !== 'Meerwerk') {
        output.push({
          'amount': `${task.total.toLocaleString('nl')} uur`,
          'description': task.name,
          'price': this.hourlyRate
        });
      } else {
        task.entries.forEach(entry => {
          output.push({
            'amount': `${entry.hours.toLocaleString('nl')} uur`,
            'description': `${entry.date}: ${entry.notes}`,
            'price': this.hourlyRate
          });
        });
      }
    });

    return output;
  }
}

const moneybird = new Moneybird();

export default moneybird;
