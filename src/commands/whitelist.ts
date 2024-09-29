import * as DJS from 'discord.js';
import getPrismaClient from '../prismaSingleton';

export default async function whitelist(ev: DJS.CommandInteraction) {
    const prisma = await getPrismaClient();
    const user = await prisma.shockUser.findUnique({where: {discordId: ev.user.id}})
    const arg_user = ev.options.get('user')?.user as DJS.User;

    if (!user) {
        await ev.reply('You are not signed up!');
        return;
    }
    if (user.allowedUsers.includes(arg_user.id)) {
        await ev.reply('That user is already in your whitelist');
        return;
    }
    await prisma.shockUser.update({
        where: {
            discordId: ev.user.id
        },
        data: {
            allowedUsers: {
                push: arg_user.id
            }
        }
    })
    await ev.reply(`Added ${arg_user.username} to your whitelist`);
}