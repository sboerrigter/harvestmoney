import moneybird from './moneybird'

export default {
  storage: {
    contacts: 'contacts',
    choices: 'choices',
  },
  getAll() {
    return new Promise(resolve => {
      if (localStorage.getItem(this.storage.contacts)) {
        resolve(JSON.parse(localStorage.getItem(this.storage.contacts)));
      } else {
        moneybird.getContacts().then(contacts => {
          localStorage.setItem(this.storage.contacts, JSON.stringify(contacts));

          resolve(contacts);
        });
      }
    });
  },
  getChoices() {
    const cache = localStorage.getItem(this.storage.choices);
    return (cache ? JSON.parse(cache) : {});
  },
  getPreviousChoice(id) {
    const choices = this.getChoices();

    return (choices[id] ? choices[id] : '');
  },
  save(contactId, projectId) {
    const choices = this.getChoices();

    choices[projectId] = contactId;
    localStorage.setItem(this.storage.choices, JSON.stringify(choices));
  },
}
