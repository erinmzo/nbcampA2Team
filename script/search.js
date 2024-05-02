import { movie } from './index.js';

async function searchFn() {
  const data = await movie();
  console.log(data);
}

searchFn();
