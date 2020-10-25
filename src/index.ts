import Axios from "axios";
import { config } from 'dotenv';

(async () => {
  config();
  try {
    const { data } = await Axios.get('https://api.github.com/rate_limit', {
      headers: {
        Authorization: `token ${process.env.TOKEN}`
      }
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();