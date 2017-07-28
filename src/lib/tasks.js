import harvest from './harvest.js';

export default {
  get() {
    return harvest.getTasks().then(tasks => {
      tasks = this.removeAbdundantObjects(tasks);
      tasks = this.filter(tasks);
      tasks = this.order(tasks);

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

  order(tasks) {
    const output = [];

    tasks.forEach(task => {
      if (task.name == 'Projectmanagement') {
        this.projectmanagement = task;
      } else if (task.name == 'Meerwerk') {
        this.meerwerk = task;
      } else if (task.name == 'Onderhoud') {
        // Do nothing
      }
       else {
        output.push(task);
      }
    });

    output.push(this.projectmanagement);
    output.push(this.meerwerk);

    return output;
  }
}
