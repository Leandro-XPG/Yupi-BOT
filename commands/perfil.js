const openDb = require('../db');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'perfil',
    description: 'mostra o seu perfil no bot',
    async execute(msg,args){
        const userId = msg.author.id;
        const userName = msg.author.username;

        const db = await openDb();
        const perfil = await db.get('SELECT * FROM perfis WHERE id = ?',[userId]);
        const avatar = msg.author.displayAvatarURL({dynamic : true});

        if(!perfil){
            return msg.reply('Você não possui um perfil Yupi! Crie um usando o comando "!registrar"');
        }

        const embed = new EmbedBuilder()
            .setColor('#5901E0')
            .setAuthor({
                name: `${userName}`,
                iconURL: avatar
            })
            .addFields(
                {name: 'Nível', value: perfil.nivel.toString(), inline: true},
                {name: 'XP', value: perfil.xp.toString(), inline:true}
            )
            .setTimestamp();

        msg.reply({embeds: [embed]});
    }
}

