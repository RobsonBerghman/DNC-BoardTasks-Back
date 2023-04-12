const e = require("express");

async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;

    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/"){
         // Usuario esta no localhost
        return next();
    }

    if(senha === process.env.SWAGGER_SENHA_DOC){
         // Usuario digitou a senha certa
        return next();
    }

    if(senhaDigitada){
         // Usuario digitou a senha errada
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <p style"color: red;">Senha Errada!</p>
                <label for="senha">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada/>
                <button type="submit">Entrar</button>
            </form>
        `))
    } else{
        // Usuario ainda não digitou a senha e esta em modo produção
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <label for="senha">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada/>
                <button type="submit">Entrar</button>
            </form>
        `))
    }
}

module.exports = authDocProducao;