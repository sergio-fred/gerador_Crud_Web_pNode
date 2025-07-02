const fs = require('fs');

function fInserird(tmestre,tdetalhes,mestrePk,detalhePk,projeto) {
    let f = [];

    f.push('<%- include("head.ejs") -%> ');
    f.push('<div> ');
    f.push('<div class="card-header">     ');
    f.push('<h4>Registro da tabela mestre</h4> ');
   
// campos tabela Mestre
for (let i=0; i < tmestre.length; i++) {
    f.push('<div class="form-group">    ');
    f.push('<label>'+ tmestre[i].name +'</label>   ');
    f.push('<input type="text" class="form-control form-control-sm" name="'+ tmestre[i].name +'" value="<%= dado.'+ tmestre[i].name +' %>" readonly="readonly" >   ');
    f.push('</div>  ');
}
    f.push('</div>    ');
    f.push('</div>   ');
    f.push('<!-- Atualizar dados da tabela Publicacao --> ');
    f.push('<div class="card-header"> ');
    f.push('<ul class="nav nav-pills w-100">    ');
    f.push('<li class="nav-pill active">  ');
    f.push('<h4>Incluir na Tabela de Detalhes</h4>    ');
    f.push('</li>    ');
    f.push('</ul>    ');
    f.push('<div> ');
    f.push('<!-- Form para inclusao de nova regisgro Detalhes para Mestre -->  ');
    f.push('<div class="card-body">  ');
    f.push('<!-- <form  action="/inserirDetalhe" method="post"> -->  ');
    f.push('<form  action="/inserirD/<%= dado.'+mestrePk+' %>/<%= dado.'+detalhePk+' %>" method="post"> ');
    f.push('<table class="table table-striped table-hover table-active">  ');
    f.push('<tr>   ');
    f.push('<td colspan="2">Detalhes relaionado com a tabela Mestre</td>  ');
    f.push('</tr>  ');

    for (let parame of tdetalhes) {   
        if (parame.pk != 1 && from_fk!=parame.name) {
            f.push('<tr>   ');
            f.push('<td>'+parame.name+'</td>  ');
            f.push('<td><input class="form-control" type="text" name="'+parame.name+'" value="<%= '+parame.name+' %>" /></td> ');
            f.push('</tr>  ');
        }
    }        
    f.push('<tr>   ');
    f.push('<td colspan="2">   ');
    f.push('<input class="btn btn-primary" type="submit" name="btIncuirPub" value="Inserir"/>   ');
    f.push('<a href="/" class="btn btn-outline-primary btn-sm">Voltar</a>     ');
    f.push('</td>   ');
    f.push('</tr>  ');
    f.push('</table>  ');
    f.push('</form>  ');
    f.push('</div>     ');
    f.push('<footer> ');
    f.push('<p>&copy; 2020 - https://www.programador1.com.br</p> ');
    f.push('</footer> ');
    f.push('</body>    ');
    f.push('</html>  ');
 //fim do fonte

f = f.join(' \n ');

// escreve fonte do arquivo de config. app.js
fs.writeFile('./apps/'+projeto+'/views/inserirD.ejs', f, (err) => { 
    if (err) throw err;
});

}  //fim da função func_appapp.use(express.json());

module.exports = {fInserird: fInserird};