const {EmbedBuilder} = require('discord.js')

module.exports ={
    name: 'yupi',
    execute(interactionOrMessage, args){
        const embed = new EmbedBuilder()
            .setTitle('Olá, eu sou o Yupi!')
            .setColor('#5C366B')
            .addFields(
                {name: 'Site', value: 'https://leandro-xpg.github.io/YupiCode-FrontEnd/', inline: false},
                {name: 'GitHub', value: 'https://github.com/Leandro-XPG/Yupi-Bot', inline: false} 
            )
            .setFooter({text: 'Yupi-Bot'})
            .setTimestamp();

            interactionOrMessage.reply({embeds:[embed]});
    }
}