import Bot, { Command } from '..';
import { Message, DiscordAPIError, MessageEmbed } from 'discord.js';
import * as covidapi from '../../covidapi';

async function callback(client: Bot, message: Message, name: string, args: string[]): Promise<void> {
    const embed = new MessageEmbed().setURL('https://covid19api.com');
    if (args.length == 0) {
        try {
            let result: covidapi.Global = await client.covidapi.getGlobal();
            embed.setTitle('Covid-19 Global Stats');
            embed.addField('New Confimed', result.NewConfirmed);
            embed.addField('New Deaths', result.NewDeaths);
            embed.addField('New Recovered', result.NewRecovered);
            embed.addField('Total Confirmed', result.TotalConfirmed);
            embed.addField('Total Deaths', result.TotalDeaths);
            embed.addField('Total Recovered', result.TotalRecovered);
        } catch(e) {
            embed.setTitle('Covid-19 Error');
            embed.setDescription('Looks like the api is having issues please try again later');
        }
    } else {
        try {
            let result: covidapi.Country = await client.covidapi.getCountry(args[0]);
            embed.setTitle(`Covid-19 ${result.Country} Stats`);
            embed.addField('New Confimed', result.NewConfirmed);
            embed.addField('New Deaths', result.NewDeaths);
            embed.addField('New Recovered', result.NewRecovered);
            embed.addField('Total Confirmed', result.TotalConfirmed);
            embed.addField('Total Deaths', result.TotalDeaths);
            embed.addField('Total Recovered', result.TotalRecovered);
        } catch(e) {
            embed.setTitle('Covid-19 Error');
            embed.setDescription('Looks like the country you are looking for is not in our database at the moment');
        }
    }

    message.channel.send(embed);
}

const command: Command = {
    name: 'covid',
    callback: callback
}

export { command };