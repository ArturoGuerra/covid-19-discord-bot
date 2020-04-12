import * as covid from './covid';
import * as addme from './addme';
import * as help  from './help';
import { Command } from '../';

/*
Adds commands to pre-registration array
*/

const commands: Command[] = [covid.command, addme.command, help.command];

export default commands;