import harvest from './harvest.js';

export default {
  get() {
    return harvest.getTasks().then(tasks => {
      tasks = this.removeAbdundantObjects(tasks);
      tasks = this.filter(tasks);

      return tasks;
    });
  },

  removeAbdundantObjects(tasks) {
    const output = [];

    tasks.forEach(task => {
        output.push(task.task);
    });

    return output;
  },

  filter(tasks) {
    const output = [];

    tasks.forEach(task => {
      if (!task.deactivated) {
        output.push(task);
      }
    });

    return output;
  },
}
