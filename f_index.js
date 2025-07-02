const fs = require('fs');

function funcIndex(tmestre,tdetalhes,projeto) {
let f = [];
f.push('<%- include("head.ejs"); %>');
f.push('<body> ');
f.push('<div class="table-responsive-sm"> ');
f.push('<table class="table table-striped table-sm">');
f.push('<thead>');
f.push('<tr>');
for (let i=0; i < tmestre.length; i++) {
  f.push(' <th> ' + tmestre[i].name + ' </th>') ;
}
for (let parame of tdetalhes) {   
    if (from_fk!=parame.name) {
     f.push(' <th> ' + parame.name + ' </th>') ; 
    }
}        

f.push('<th class="d-print-none"> ');
f.push('<a class="btn btn-sm btn-success" href="/inserirM">Cadastra novo registro</a> ');
f.push('</th> ');
f.push('</tr> ');
f.push('</thead> ');
f.push('<tbody> ');
f.push('<% for (const mestre of dados) { %>     '); 
f.push('<tr> ');
for (let i=0; i < tmestre.length; i++) {
    f.push(' <th> <%= mestre.'+ tmestre[i].name + ' %> </th>') ;
}
for (let parame of tdetalhes) {   
    if (from_fk!=parame.name) {
        f.push(' <th> <%= mestre.'+ parame.name + ' %> </th>') ;
    }
}        

f.push('<td class="d-print-none"> ');
f.push('<a class="btn btn-sm btn-info" href="/inserirD/<%= mestre.'+tmestre[0].name+' %>/<%= mestre.'+tdetalhes[0].name+' %>">Inclui</a> ');
f.push('<a class="btn btn-sm btn-warning" href="/editar/<%= mestre.'+tmestre[0].name+' %>/<%= mestre.'+tdetalhes[0].name+' %>">Edita</a> ');
f.push('<a class="btn btn-sm btn-danger" href="/delete/<%= mestre.'+tmestre[0].name+' %>/<%= mestre.'+tdetalhes[0].name+' %>">Deleta</a> ');
f.push('</td> ');
f.push('</tr> ');
f.push('<%} %> ');
f.push('</tbody> ');
f.push('</table> ');
f.push('</div> ');
f.push('</div> ');
f.push('</div> ');
f.push('</body> ');
f.push('<footer> ');
f.push('<p>&copy; 2020 - https://www.programador1.com.br</p> ');
f.push('</footer> ');
f.push('</html> ');

f = f.join(' \n ');
// escreve fonte do arquivo de config. app.js
fs.writeFile('./apps/'+projeto+'/views/index.ejs', f, (err) => {  //VER DIR DE GRAVAÇÃO DO ARQUIVO
    if (err) throw err;
  
});

}  //fim da função func_appapp.use(express.json());

module.exports = {funcIndex: funcIndex};