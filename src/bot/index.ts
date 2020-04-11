import * as Discord from 'discord.js';
import { Config } from '../config';
import CovidAPI from '../covidapi';
import { Message } from "discord.js";

interface Command {
    name: string;
    callback(client: Bot, message: Message, command: string, args: string[]): void;
}

class Bot extends Discord.Client {
    config: Config;
    covidapi: CovidAPI;
    commands: Discord.Collection<string, Command>;
    
    constructor(config: Config, covidapi: CovidAPI) {
        super();
        this.config = config;
        this.covidapi = covidapi;
        this.commands = new Discord.Collection();
    }

    registerCommand(command: Command) {
        this.commands.set(command.name, command);
    }

    async commandHandler(message: Discord.Message): Promise<void> {
        let content: string = message.content;
        if (content.length === 0) {
            return;
        }

        let split: string[] = content.split(' ');
        if (!split[0].startsWith(this.config.prefix)) {
            return;
        }

        let name: string = split[0].replace(this.config.prefix, '');
        let args: string[] = [];

        if (split.length > 1) {
            args = split.slice(1);
        }

        let cmd: Command = this.commands.get(name);
        if (cmd == null) {
            return;
        }

        cmd.callback(this, message, name, args);
    }

    start() {
        super.login(this.config.token);
    }
}

export default Bot;
export { Command };