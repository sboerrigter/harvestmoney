import harvest from './harvest.js';

export default {
  get() {
    return harvest.getProjects().then(projects => {
      projects = this.removeAbdundantObjects(projects);
      projects = this.filter(projects);
      projects = this.order(projects);
      projects = this.addTasks(projects);

      return projects;
    });
  },

  removeAbdundantObjects(projects) {
    const output = [];

    projects.forEach(project => {
        output.push(project.project);
    });

    return output;
  },

  filter(projects) {
    const output = [];

    projects.forEach(project => {
      if (project.active && project.billable) {
        output.push(project);
      }
    });

    return output;
  },

  order(projects) {
    return projects.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    });
  },

  addTasks(projects) {
    return harvest.getTasks().then(tasks => {



      projects.forEach(project => {
          Object.assign(project, {'tasks': tasks});
          console.log(project);
      });

      return projects;
    });
  }
}
