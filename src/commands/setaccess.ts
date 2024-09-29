import * as DJS from 'discord.js';
import getPrismaClient from '../prismaSingleton';

export default async function setaccess(ev: DJS.CommandInteraction) {
    const prisma = await getPrismaClient();
    const arg_setting = await ev.options.get('mode')?.value as string;

    const user = await prisma.shockUser.findUnique({where: {discordId: ev.user.id}});
    if (!user) {
        await ev.reply({content: 'You are not currently signed up', ephemeral: true});
        return;
    }

    if (arg_setting === 'OPEN') {
        await prisma.shockUser.update({where: {discordId: ev.user.id}, data: {userMode: 'OPEN'}});
        await ev.reply({content: 'Your access level has been set to OPEN', ephemeral: true});
        return;
    }
    if (arg_setting === 'WHITELIST') {
        await prisma.shockUser.update({where: {discordId: ev.user.id}, data: {userMode: 'WHITELIST'}});
        await ev.reply({content: 'Your access level has been set to WHITELIST', ephemeral: true});
        return;
    }
    if (arg_setting === 'CLOSED') {
        await prisma.shockUser.update({where: {discordId: ev.user.id}, data: {userMode: 'CLOSED'}});
        await ev.reply({content: 'Your access level has been set to CLOSED', ephemeral: true});
        return;
    }
}