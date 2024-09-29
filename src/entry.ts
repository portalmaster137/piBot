import getPrismaClient from "./prismaSingleton";
import pino from 'pino';
import * as denv from 'dotenv';
import * as DJS from 'discord.js';


const logger = pino()

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
logger.info('Environment variables loaded successfully');

const Intents = [
    DJS.GatewayIntentBits.Guilds,
    DJS.GatewayIntentBits.GuildMessages,
    DJS.GatewayIntentBits.MessageContent,
]

const CLIENT = new DJS.Client({intents: Intents});
