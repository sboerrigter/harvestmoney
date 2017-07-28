import date from './date.js';
import harvest from './harvest.js';

export default {
  get(project) {
    return harvest.getEntries(project.id).then(entries => {
      entries = this.removeAbdundantObjects(entries);
      entries = this.addDate(entries);
      entries = this.groupByTask(entries, project.tasks);

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

  groupByTask(oldEntries, oldTasks) {
    let newTasks = [];

    oldTasks.forEach(task => {
      let newEntries = [];

      oldEntries.forEach(entry => {
        if (task.id == entry.task_id) {
          newEntries.push(entry);
        }
      });

      let newTask = Object.assign(task, {'entries': newEntries});

      console.log(newTask.entries.length);

      if (newTask.entries.length !== 0) {
        newTasks.push(newTask);
      }
    });


    // @todo remove empty tasks


    return newTasks;
  },
}
