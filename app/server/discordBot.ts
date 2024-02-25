import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Message, TextChannel } from 'discord.js';

export class DiscordBot {
    private client: Client;

    constructor(){
        this.client = new Client({
            intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
        });
        this.setupBot();
    }

    private setupBot(): void {
        this.client.once('ready', () => {
            console.log("Discord bot is ready!");
        });

        this.client.on('messageCreate', async (message: Message) => {
            if (message.author.bot || !message.content.startsWith('!')) return;

            const generateIssue = new ButtonBuilder()
                .setLabel('Generate Issue')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('generate_issue');
            const buttonRow = new ActionRowBuilder().addComponents(generateIssue);
            const channel = message.channel as TextChannel;
            
            channel.send('Click the botton to genreate Issue').then(sendMessage => {
                sendMessage.reply({ content: 'Click the button to generate Issue', components: [buttonRow] })
                sendMessage.react('🆘');
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

        this.client.login('MTIxMTM4NjI4NjU3Mzg3OTI5Nw.G9MRsT.EQsTSA8xgTXMXUEe93_nt19peT07k_8Hx1p6cg')
    }
}