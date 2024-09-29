import * as DJS from 'discord.js';
import getPrismaClient from '../prismaSingleton';

export default async function signup(interaction: DJS.CommandInteraction) {
    const prisma = await getPrismaClient();

    if (await prisma.shockUser.findUnique({where: {discordId: interaction.user.id}})) {
        await interaction.reply('You are already signed up!');
        return;
    }

    const arg_username = interaction.options.get('username')?.value as string;
    const arg_apikey = interaction.options.get('apikey')?.value as string;
    const arg_code = interaction.options.get('code')?.value as string;

    if (!arg_username || !arg_apikey || !arg_code) {
        await interaction.reply('You must provide all 3 arguments');
        return;
    }

    await prisma.shockUser.create({
        data: {
            discordId: interaction.user.id,
            pishockUsername: arg_username,
            pishockAPIKey: arg_apikey,
            pishockCode: arg_code
        }
    })

    await interaction.reply('You have been signed up with a blank whitelist. Use /whitelist to add some people to it');
}