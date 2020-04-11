import CovidAPI, { Global, Country } from './coronatime';

const covidClient: CovidAPI = new CovidAPI();

async function main() {
   await covidClient.populate();

   let global: Global = await covidClient.getGlobal();
   console.log(global);
}


main();