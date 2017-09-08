# Harvest Money

Easily create MoneyBird invoices from Harvest reports.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Enable cross origin resource sharing

To use this app you will need the [Allow-Control-Allow-Origin: \*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) Chrome extension. Use this extension to "Enable cross origin resource sharing".

Then remove the default value at "Intercepted URL’s or URL patterns" and add `*://moneybird.com/*`, to make sure that both the Harvest and MoneyBird API are accessible from your local machine.

## Environment variables

Create a `env.js` file to setup the following local environment variables. See `env.js.example` for an example.

```
export default {
  'HARVEST_ACCOUNT': 'your_harvest_account',
  'HARVEST_CLIENT_ID': 'your_harvest_client_id',
  'MONEYBIRD_CLIENT_ID': 'your_moneybird_client_id',
  'MONEYBIRD_CLIENT_SECRET': 'your_moneybird_client_secret',
  'MONEYBIRD_ADMINISTRATION_ID': 'your_administration_id',
}
```
