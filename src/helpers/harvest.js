import axios from 'axios';
import env from '../env.js';

export default class Harvest {

  constructor() {
    this.account = env.HARVEST_ACCOUNT; // Should be provided in ./env.js
    this.username = env.HARVEST_USERNAME; // Should be provided in ./env.js
    this.password = env.HARVEST_PASSWORD; // Should be provided in ./env.js
  }

  getProjects() {
    axios.request({
      url: `https://${this.account}.harvestapp.com/projects`,
      headers: {
        'Authorization': `Basic ' ${btoa(`${this.username}:${this.password}`)}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response.data);
    });

    return [
      {
        id: 1,
        name: "Project naam",
        uninvoiced: 53.5,
        link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
      },
      {
        id: 1,
        name: "Nog ene project",
        uninvoiced: 53.5,
        link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
      },
      {
        id: 1,
        name: "Derde project",
        uninvoiced: 53.5,
        link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
      },
      {
        id: 1,
        name: "Project",
        uninvoiced: 53.5,
        link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
      },
      {
        id: 1,
        name: "Project",
        uninvoiced: 53.5,
        link: "https://www.youtube.com/embed/-0kcet4aPpQ?autoplay=1",
      }
    ];
  }
}
