const {Client, GatewayIntentBits,Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openDb = require('./db');

const client = new Client({
    intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent],
});

const PREFIX = '!';
client.commands = new Collection();

const commandsFiles = fs.readdirSync(path.join(__dirname,'commands')).filter(file=> file.endsWith('.js'));

for (const file of commandsFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () =>{
    console.log(`${client.user.tag} está online!`);
}); 


client.on('messageCreate',async message=>{
   if (message.author.bot || !message.content.startsWith(PREFIX)) return;

   const args = message.content.slice(PREFIX.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   const command = client.commands.get(commandName);
   if(!command) return;

   try{
    command.execute(message, args);
   }catch (error){
    console.error(error);
    message.reply('Erro ao tentar executar o comando!');
   }





    try{
        const db = await openDb();
        const userId = message.author.id;
        const perfil = await db.get('SELECT * FROM perfis WHERE id=?',[userId]);

        if(!perfil) return;

        const xpGanho = 10;
        let novoXp = perfil.xp + xpGanho;
        let novoNivel = perfil.nivel

        const xpParaUp = 100 * novoNivel;
        if(novoXp >= xpParaUp){
            novoXp -= xpParaUp;
            novoNivel++;
            message.channel.send(`${message.author} subiu para o nível ${novoNivel}`);
        }

        await db.run('UPDATE perfis SET xp = ?, nivel = ? WHERE id = ?',[novoXp, novoNivel,userId]);
    }catch(err){
        console.error('Erro ao atualizar XP: ', err);
    }
});

client.login(process.env.TOKEN);