const openDb = require('./db');

(async () =>{
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS perfis(
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        nivel INTEGER NOT NULL DEFAULT 1,
        xp INTEGER NOT NULL DEFAULT 0
        
        );
        
        
        `);

    console.log('Banco de dados criado com sucesso!');
})();