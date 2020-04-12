import Bot, { Command } from '..';
import { Message, MessageEmbed } from 'discord.js';


async function callback(client: Bot, message: Message, name: string, args: string[]): Promise<void> {
    const embed: MessageEmbed = new MessageEmbed();
    const prefix: string = client.config.prefix;

    embed.setTitle('Help Page');
    embed.addField(`${prefix}covid <optional country name, leave blank for global`, "This command fetches the covid-19 stats for a country or globally");
    embed.addField(`${prefix}addme`, 'This command sends an invite link for me so you can have covid-19 stats in your own server');
    embed.addField(`${prefix}help`, 'This command which outputs a command list');
    
    try {
        message.channel.send(embed);
    } catch(e) {
        console.error(`Unable to send message: ${e.code}`);
    }
}


export const command: Command = {
    name: 'help',
    callback: callback
}