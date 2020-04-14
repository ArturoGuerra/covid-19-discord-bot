import CovidAPI, { Global, Country } from './covidapi';
import ConfigLoader, { Config } from './config';
import Bot from './bot';
import commands from './bot/commands';

const config: Config = ConfigLoader();
const covidClient: CovidAPI = new CovidAPI();
const bot: Bot = new Bot(config, covidClient);
covidClient.populate();
setInterval(async ()=> {
   console.log('Updating stats...');
   await covidClient.populate();
}, 3600000);

commands.forEach(command => {
   console.log(`Registering command: ${command.name}`);
   bot.registerCommand(command);
});

bot.on('message', bot.commandHandler);

bot.start();