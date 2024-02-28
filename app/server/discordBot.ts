import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Message, TextChannel } from 'discord.js';
import GPTService from './GPTService';

require('dotenv').config();

export class DiscordBot {
    private client: Client;
    private gptService: GPTService;

    constructor(){
        this.client = new Client({
            intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
        });
        this.setupBot();
        this.gptService = new GPTService();
    }

    private setupBot(): void {
        this.client.once('ready', () => {
            console.log("Discord bot is ready!");
        });

        this.client.on('messageCreate', async (message: Message) => {
            if (message.author.bot || 
                !(await this.gptService.getGPTResponse(message.toString()))) return;

            const generateIssue = new ButtonBuilder()
                .setLabel('Generate Issue')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('generate_issue');
            const buttonRow = new ActionRowBuilder().addComponents(generateIssue);
            const channel = message.channel as TextChannel;

            channel.send({ content: 'Click the button to generate Issue', components: [buttonRow] })
                .then(sendMessage => {
                    sendMessage.react('🆘')
                });
        });

        this.client.on('interactionCreate', async interaction => {
            console.log(interaction);
            if (!interaction.isButton()) return;

            if (interaction.customId === 'generate_issue') {
                interaction.reply('Issue has been generated');

                if (interaction.message) {
                    interaction.message.edit({ content: 'Issue has been generated', components: [] });
                }
            }
        });

        this.client.login(process.env.DISCORD_BOT_TOKEN);
    }
}