const openDb = require('../db');

module.exports ={
    name: 'registrar',
    description: 'cria seu perfil no bot',
    async execute(msg,args){
        const userId =  msg.author.id;
        const userName = msg.author.username;

        const db = await openDb();
        const perfil = await db.get('SELECT * FROM perfis WHERE id = ?', [userId]);

        if(perfil){
            return msg.reply('Você ja possui um perfil Yupi!');
        }

        await db.run('INSERT INTO perfis (id, nome) VALUES (?,?)', [userId, userName]);
        msg.reply('Perfil Criado com sucesso!');
    }
}