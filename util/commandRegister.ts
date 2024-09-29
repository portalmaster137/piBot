import * as denv from 'dotenv';
import * as DJS from 'discord.js';
import pino from 'pino';
const logger = pino()

denv.config();

const Commands = [
    new DJS.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    
    new DJS.SlashCommandBuilder()
    .setName('signup')
    .setDescription('Sign up to be shocked :3')
    .addStringOption(option =>
        option.setName('username')
        .setDescription('Your username as it appears on the pishock website')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('apikey')
        .setDescription('Your API key from the pishock website')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('code')
        .setDescription('The Share Code you want to use')
        .setRequired(true)
    ),

    new DJS.SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the database'),

    new DJS.SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Add someone to your whitelist')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The user you want to add to your whitelist')
        .setRequired(true)
    ),

    new DJS.SlashCommandBuilder()
    .setName('shock')
    .setDescription('Shock someone! >:D')
    .addUserOption(opt =>
        opt.setName('user')
        .setDescription('The user you want to shock >:3')
        .setRequired(true)
    )
    .addIntegerOption(opt =>
        opt.setName('duration')
        .setDescription('The duration of the shock in seconds')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10)
    )
    .addIntegerOption(opt =>
        opt.setName('intensity')
        .setDescription('The intensity of the shock')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),

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
