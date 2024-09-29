import * as DJS from 'discord.js';
import getPrismaClient from '../prismaSingleton';

export default async function leave(ev: DJS.CommandInteraction) {
    const prisma = await getPrismaClient();
    
    if (!await prisma.shockUser.findUnique({where: {discordId: ev.user.id}})) {
        await ev.reply("You are not currently in the database.");
        return
    };
    await prisma.shockUser.delete({where: {discordId: ev.user.id}});
    await ev.reply('You have been removed from the database. :)');
    return;
}