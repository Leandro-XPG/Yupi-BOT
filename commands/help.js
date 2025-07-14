const {EmbedBuilder} = require('discord.js');


module.exports = {
    name: 'help',
    execute(interactionOrMessage,args){
        const embed = new EmbedBuilder()
            .setTitle('Precisa de ajuda?')
            .setDescription('Selecione a área que precisa de ajuda:')
            .setColor('#F42701')
            .addFields(
                {name: 'Comandos de Perfil', value: '!perfil', inline: false},
                {name: 'Comandos de Games', value: '!quiz', inline: false}
            )
            .setFooter({text: 'Yupi-Bot'})
            .setTimestamp();
        
            interactionOrMessage.reply({embeds:[embed]});
    }
        
};