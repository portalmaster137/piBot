import * as DJS from 'discord.js';
import getPrismaClient from '../prismaSingleton';
import axios from 'axios';
import { PISHOCK_NAME } from '../../util/consts';

export default async function shock(ev: DJS.CommandInteraction) {
    const prisma = await getPrismaClient();

    const arg_user = ev.options.get('user')?.user as DJS.User;
    const arg_duration = ev.options.get('duration')?.value as number;
    const arg_intensity = ev.options.get('intensity')?.value as number;

    const target = await prisma.shockUser.findUnique({where: {discordId: arg_user.id}});
    if (!target) {
        await ev.reply({content: 'User not found in the database', ephemeral: true});
        return;
    }

    if (target.userMode === "CLOSED") {
        await ev.reply({content: 'This user has closed their access for now.', ephemeral: true});
        return
    }

    if (target.userMode === "WHITELIST" && !target.allowedUsers.includes(ev.user.id)) {
        await ev.reply({content: 'You are not allowed to shock this user', ephemeral: true});
        return;
    }
    const msg = `Shocking ${arg_user.username} for ${arg_duration} seconds with intensity ${arg_intensity}`;
    await ev.reply({content: msg});
    const res = await axios.post('https://do.pishock.com/api/apioperate', {
        Username: target.pishockUsername,
        Apikey: target.pishockAPIKey,
        Code: target.pishockCode,
        Name: PISHOCK_NAME,
        Op: 0,
        Duration: arg_duration,
        Intensity: arg_intensity
    });

    await ev.editReply({content: msg + '\n' + res.data});
    return;
}