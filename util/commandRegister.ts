import * as denv from 'dotenv';
import * as DJS from 'discord.js';
import pino from 'pino';
const logger = pino()

denv.config();

const Commands = [
    new DJS.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
]

if (!process.env.TOKEN) {
    logger.error('Token not found in .env file');
    process.exit(1);
}
if (!process.env.CLIENT_ID) {
    logger.error('Client ID not found in .env file');
    process.exit(1);
}
if (!process.env.GUILD_ID) {
    logger.error('Guild ID not found in .env file');
    process.exit(1);
}

const REST = new DJS.REST().setToken(process.env.TOKEN);
(async () => {
    try {
        logger.info('Started refreshing application (/) commands.');

        await REST.put(DJS.Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), { body: Commands });

        logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        logger.error(error);
    }
})()
