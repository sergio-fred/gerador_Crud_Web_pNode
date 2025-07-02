const fs = require('fs');

function fInserirm(tmestre,tdetalhes,projeto) {
let f = [];

f.push('<%- include("head.ejs") -%> ');
f.push('  ');
f.push('<form action="inserirM" method="post"> ');
f.push('<!-- Dados para inserir tabela mestre  --> ');

for (let campo of tmestre) {   
    if (campo.pk != 1 && from_fk!=campo.name) {
     f.push('<div> ');
     f.push('<label for="">'+ campo.name +'</label> ');
     f.push('<input type="text" name="'+ campo.name +'" class="form-control" value="<%= dados.'+ campo.name +' %>"> ');
     f.push('</div> ');
    }
}

f.push('<br> ');
f.push('<!-- Dados para inserir tabela detalhes  --> ');
f.push('<h4>Registros Relacionados a tabela Mestre</h4> ');

for (let parame of tdetalhes) {   
    if (parame.pk != 1 && from_fk!=parame.name) {
     f.push('<div> ');
     f.push('<label for="">'+ parame.name +'</label> ');
     f.push('<input class="form-control" type="text" name="'+ parame.name +'" value="<%= dados.'+ parame.name +' %>" /> ');
     f.push('</div> ');
    }
}

f.push('<br> ');
f.push('<input class="btn btn-primary" id="button1" type="submit" name="btIncuirPub" value="Inserir" /> ');
f.push('<a href="/" class="btn btn-outline-primary btn-sm">Voltar</a> ');
f.push('</form> ');
f.push('<body> ');
f.push('</div> ');
f.push('</div>         ');
f.push('</div>     ');
f.push('</body> ');
f.push('<footer> ');
f.push('<p>&copy; 2020 - https://www.programador1.com.br</p> ');
f.push('</footer> ');
f.push('</html> ');
//fim do fonte

f = f.join(' \n ');

// escreve fonte do arquivo de config. app.js
fs.writeFile('./apps/'+projeto+'/views/inserirM.ejs', f, (err) => { 
    if (err) throw err;
});

}  //fim da função func_appapp.use(express.json());

module.exports = {fInserirm: fInserirm};