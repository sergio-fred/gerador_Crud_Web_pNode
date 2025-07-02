const fs = require('fs');

function fDelete(mestrePk,detalhePk,tmestre,tdetalhes, projeto) {
let f = []; 
f.push('<%- include("head.ejs") -%> ');
f.push('<h4>Delete um registro mestre/detalhe?</h4> ');
f.push('<form action="/delete/<%= dados.'+detalhePk+' %>" method="post"> ');
f.push('<div class="form-horizontal"> ');
f.push('</div>  ');
   
// campos tabela Mestre
for (let i=0; i < tmestre.length; i++) {
     f.push('<div class="form-group">    ');
     f.push('  <label>'+ tmestre[i].name +'</label>   ');
     f.push('  <input type="text" class="form-control form-control-sm" name="'+ tmestre[i].name +'" value="<%= dados.'+ tmestre[i].name +' %>" readonly="readonly" >   ');
     f.push('</div>  ');
}
f.push('<!-- Atualizar dados da tabela de detalhes--> ');
f.push('<div class="card-header">    ');
f.push('<ul class="nav nav-pills w-100">    ');
f.push('<li class="nav-pill active">    ');
f.push('<h4>Editar Tabela de Detalhes</h4>    ');
f.push('</li>    ');
f.push('</ul>    ');
f.push('</div>   ');

// campos tabela Detalhes
for (let i=0; i < tdetalhes.length; i++) {
    f.push('<div class="form-group">  ');
    f.push('<label>'+ tdetalhes[i].name +'</label>   '); 
    f.push('<input class="form-control" type="text" name="'+ tdetalhes[i].name +'" value="<%= dados.'+ tdetalhes[i].name +' %>" readonly="readonly"/>  ');
}

    f.push('<input type="submit" value="Deleta este detalhe" class="btn btn-sm btn-dark" /> ');
    f.push('<a href="/" class="btn btn-outline-primary btn-sm">Voltar</a>    ');
    f.push('</div> ');
    f.push('</form> ');
    f.push(' ');
    f.push('<div class="form-group">  ');
    let mens = " 'Tem certeza de APAGAR o registro Mestre e TODOS seus Detalhes relacionados?' ";
    f.push('<a class="btn btn-danger btn-sm" onclick="return confirm('+ mens +'); " ' );
    f.push('href="/deletaTodos/<%= dados.'+mestrePk+' %>">Deletar mestre e detalhes</a>   ');
    f.push('</div> ');
    f.push('<footer> ');
    f.push(' <p>&copy; 2020 - https://www.programador1.com.br</p> ');
    f.push('</footer> ');
    f.push('</div> ');
    f.push('</body>    ');
    f.push('</html>  ');
   //fim do fonte

f = f.join(' \n ');
// escreve fonte do arquivo de config. app.js
fs.writeFile('./apps/'+projeto+'/views/delete.ejs', f, (err) => { 
    if (err) throw err;
});

} 
module.exports = {fDelete: fDelete};