import date from './date.js';
import harvest from './harvest.js';

export default {
  get(project) {
    return harvest.getEntries(project.id).then(entries => {
      entries = this.removeAbdundantObjects(entries);
      entries = this.addDate(entries);

      return entries;
    });
  },

  removeAbdundantObjects(entries) {
    const output = [];

    entries.forEach(entry => {
        output.push(entry.day_entry);
    });

    return output;
  },

  addDate(entries) {
    const output = [];

    entries.forEach(entry => {
      output.push(Object.assign(entry, {'date': date.format(entry.spent_at)}));
    });

    return output;
  },
}
