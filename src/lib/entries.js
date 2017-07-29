import date from './date.js';
import harvest from './harvest.js';

export default {
  get(project) {
    return harvest.getEntries(project.id).then(entries => {
      entries = this.removeAbdundantObjects(entries);
      entries = this.addDate(entries);

      let tasks = this.groupByTask(entries, project.tasks);
      tasks = this.calculateTotal(tasks);

      return tasks;
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

      if (newTask.entries.length !== 0) {
        newTasks.push(newTask);
      }
    });

    return newTasks;
  },

  calculateTotal(tasks) {
    let newTasks = [];

    tasks.forEach(task => {
      let total = 0;

      task.entries.forEach(entry => {
        total += entry.hours;
      });

      total = Math.round(total * 100) / 100;
      newTasks.push(Object.assign(task, {'total': total}));
    });

    return newTasks;
  }
}
