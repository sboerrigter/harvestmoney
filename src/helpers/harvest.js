import axios from 'axios';
import env from '../env.js';

export default class Harvest {

  constructor() {
    this.clientId = env.HARVEST_CLIENT_ID; // Should be provided in ./env.js
    this.clientSecret = env.HARVEST_CLIENT_SECRET; // Should be provided in ./env.js
    this.baseUrl = 'https://ondernemeneninternet.nl/wp-json/wp/v1/posts/';
  }

  getProjects() {

    axios.get(this.baseUrl).then(response => {
      console.log(response);
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
