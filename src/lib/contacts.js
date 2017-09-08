import moneybird from './moneybird'

export default {
  storageKey: 'contacts',
  get() {
    return new Promise(resolve => {
      if (localStorage.getItem(this.storageKey)) {
        resolve(JSON.parse(localStorage.getItem(this.storageKey)));
      } else {
        moneybird.getContacts().then(contacts => {
          localStorage.setItem(this.storageKey, JSON.stringify(contacts));

          resolve(contacts);
        });
      }
    });
  },
}
