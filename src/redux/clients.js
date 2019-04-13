import axios from 'axios';

// all axios can be used, shown in axios documentation
export default {
  default: {
    client: axios.create({
      baseURL: 'http://www.apps.omshantitv.org/wp-json/posts'
    })
  },
  youtubeAPI: {
    client: axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3'
    })
  }
};
