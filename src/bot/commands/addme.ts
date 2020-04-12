import Bot, { Command } from "..";
import { Message, MessageEmbed } from 'discord.js';

const addlink: string = "https://discordapp.com/oauth2/authorize?client_id=698647314805424168&scope=bot&permissions=19456";

async function callback(client: Bot, message: Message, name: string, args: string[]): Promise<void> {
    const embed: MessageEmbed = new MessageEmbed();
    embed.setTitle("Add Me to your server :)");
    embed.setDescription(`Add [me](${addlink}) to your server for covid-19 information`);

    try {
       message.channel.send(embed);
    } catch(e) {
        console.error(`Unable to send message to channel: ${e.code}`);
    }
}


export const command: Command = {
    name: 'addme',
    callback: callback
}