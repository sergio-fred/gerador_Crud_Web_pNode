const fs = require('fs');

function fEditar(mestrePk,detalhePk,tmestre,tdetalhes,projeto) {
let f = []; 
f.push('<%- include("head.ejs") -%> ');
f.push('<h4>Editar registro de mestre</h4> ');
f.push('<form action="/editar/<%= dados.'+mestrePk+' %>/<%= dados.'+detalhePk+' %>" method="post"> ');
f.push('  <div class="form-horizontal"> ');
f.push(' ');
f.push('</div>  ');
   
// campos tabela Mestre
for (let i=0; i < tmestre.length; i++) {
  f.push(' <div class="form-group">    ');
  f.push('<label>'+ tmestre[i].name +'</label>   ');
  f.push('<input type="text" class="form-control form-control-sm" name="'+ tmestre[i].name +'" value="<%= dados.'+ tmestre[i].name +' %> ">   ');
  f.push('</div>  ');
}
f.push('<!-- dados da tabela detalhes--> ');
f.push('<div class="card-header">    ');
f.push('<ul class="nav nav-pills w-100">    ');
f.push('<li class="nav-pill active">    ');
f.push('<h4>Editar registro de detalhe</h4>    ');
f.push('</li>    ');
f.push('</ul>    ');
f.push('</div>   ');
for (let parame of tdetalhes) {   
 if (parame.pk != 1 && from_fk!=parame.name) {
   f.push('<div class="form-group">  ');
   f.push('<label>'+parame.name+'</label>   ');
   f.push('<input class="form-control" type="text" name="'+parame.name+'" value="<%= dados.'+parame.name+' %>" />  ');
   f.push('</div>  ');
 }
}
f.push('<div class="form-group">    ');
f.push('<input type="submit" class="btn btn-info" value="Editar"/> ');
f.push('<a href="/" class="btn btn-outline-primary btn-sm">Voltar</a>    ');
f.push('</div>    ');
f.push('</form>  ');
f.push('<footer> ');
f.push('<p>&copy; 2020 - https://www.programador1.com.br</p> ');
f.push('</footer> ');
f.push('</div> ');
f.push('</div> ');
f.push('</body>    ');
f.push('</html>  ');
//fim do fonte
f = f.join(' \n ');

// escreve fonte do arquivo de config. app.js
fs.writeFile('./apps/'+projeto+'/views/editar.ejs', f, (err) => {  
    if (err) throw err;
});

}  //fim da função func_appapp.use(express.json());

module.exports = {fEditar: fEditar};