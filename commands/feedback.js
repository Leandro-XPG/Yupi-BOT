const {EmbedBuilder} = require('discord.js')

module.exports = {
    name:'feedback',
    async execute(message, args){
        const feedbackChannelId = '1393271023553478826';

        const feedbackText = args.join(' ');
        if(!feedbackText){
            return message.reply('Por favor, forneça um feedback válido!');
        }

        const feedbackEmbed = new EmbedBuilder()
            .setTitle('📢 NOVO FEEDBACK!')
            .setColor('#A700EB')
            .addFields(
                {name: 'Usuário', value: `${message.author.tag}`,inline: false},
                {name: 'Feedback', value:`${feedbackText}`, inline: false}
            )
            .setTimestamp();

            const feedbackChannel = message.client.channels.cache.get(feedbackChannelId);
            if(!feedbackChannel){
                return message.reply('Canal de feedback não encontrado!')
            }

            feedbackChannel.send({embeds:[feedbackEmbed]});

            try{
                await message.delete();
            }catch (err){
                console.error('Erro ao deletar a mensagem!', err)
            }

            message.author.send('Obrigado pelo seu feedback!🤗 Ele foi enviado a equipe!');


    }   
}