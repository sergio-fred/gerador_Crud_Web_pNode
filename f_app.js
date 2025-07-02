const fs = require('fs');

function fApp(bdados,tabMestre,tabDetalhe,from_fk,to_pk,tmestre,tdetalhes,mestrePk,detalhePk,projeto) {
/*
bdados = nome do BD
tabMestre = nome tabela mestre
tbDetalhe = nome tabela detalhes
from_fk = chave estrangeira de detalhes FK
to_pk = chave primaria de mestre
tmestre = campos da tabela mestre
tdetalhes = campos da tabela detalhes
mestrePk = chave primaria da tabela mestre;
detalhePk = chave primaria da tabela detalhes
*/
let f = [];
f.push('const express = require("express"); ');
f.push('const app = express();  ');
f.push('const sqlite = require("sqlite3");  ');
f.push('const db = new sqlite.Database("./'+bdados+' ");  ');
f.push('app.use(express.urlencoded({extended: false}));  ');
f.push('app.set("engine ejs", "ejs");  ');
f.push('   ');
f.push('// (1)consulta todos regitros para index.ejs  ');
f.push('app.get("/", function (req, res) {  ');
f.push('const sql = "SELECT * FROM '+tabMestre+', '+tabDetalhe+' WHERE '+to_pk+'='+from_fk+' ORDER BY '+to_pk+' desc";  ');
f.push('db.all(sql, [], function (err, rows) {    ');
f.push('    if (err) {    ');
f.push('  return console.error(err.message);    ');
f.push('    }    ');
f.push('    res.render("index.ejs", { dados: rows });    ');
f.push('  });    ');
f.push('});    ');
f.push('//inserir novo registro para inserirM.ejs   ');
f.push('      ');
f.push('// (2)GET /inserir   ');
f.push('app.get("/inserirM", function (req, res) {   ');
f.push('    res.render("inserirM.ejs", { dados: {} });   ');
f.push('  })   ');
f.push('      ');
f.push('// POST /inserir   ');
f.push('app.post("/inserirM", function (req, res) {   ');

//() montagem SQL p/busca de campos de tabela mestre
var parte0='const sql1 = "INSERT INTO '+tabMestre+ ' (';
var parte1='', parte2='', parte3='';
for (let campo of tmestre) {   
    if (campo.pk != 1) parte1+=campo.name+',';
}
parte1=parte1.replace(/(.+),$/, '$1');  //retira ultima virgula dos campos da tab 
var parte2=') VALUES ( ';   
for (let parame of tmestre) {
     if (parame.pk != 1) parte3+=' ?,';
}
parte3=parte3.replace(/(.+),$/, '$1');  //retira ultima virgula dos parametros 
var parte4=' )";';
f.push(' '+parte0+parte1+parte2+parte3+parte4+' ');
//fim montagem da SQL insert

//f.push('const dadosMestre = [req.body.Campo_mestre1, req.body.Campo_mestre2]; ');
var par1='const dadosMestre = [', par2='', par3=' ];';
for (let parame of tmestre) {   
    if (parame.pk != 1 && from_fk!=parame.name) {
        par2+='req.body.'+parame.name+',';  
    }
}    
f.push(' '+par1+par2+par3+ ' ');

f.push('db.run(sql1, dadosMestre, function (err) {   ');
f.push('if (err) {   ');
f.push('return console.error(err.message);   ');
f.push('}   ');
f.push('});   ');
f.push('// SELECT Tabela_mestre para recuperar ID_mestre para relacionamento   ');
f.push('FK = "";  ');
f.push('const sql2 = "SELECT * FROM '+tabMestre+' ORDER BY '+to_pk+' DESC limit 1";   ');
f.push('db.all(sql2, [], function (err, rows) {   ');
f.push('if (err) {   ');
f.push('return console.error(err.message);   ');
f.push('}   ');
f.push('FK =  rows[0].'+mestrePk+';   ');
f.push('  ');
f.push('//INSERT Tabela_detalhes   ');

//() montagem SQL INSERT p/busca de campos de tabela detalhes
camposTabDeta(f); //() montagem SQL INSERT p/busca de campos de tabela

//f.push('const dadosDetalhe = [req.body.Atributo_detalhe1, req.body.Atributo_detalhe2, FK]; ');
var par1='const dadosDetalhe = [', par2='', par3=' ];';
for (let parame of tdetalhes) {  
    if (parame.pk != 1 ) { //busca campos em tb detalhes e substui fk por variável 'FK'
        if ( from_fk == parame.name) {
            par2+='FK'+',';
        } else {
        par2+='req.body.'+parame.name+',';
       }
    }    
}
       
f.push(' '+par1+par2+par3+ ' ');

f.push('db.run(sql3, dadosDetalhe, function (err) {   ');
f.push('  if (err) {   ');
f.push('    return console.error(err.message);   ');
f.push('  }   ');
f.push('  res.redirect("/");   ');
f.push('});   ');
f.push('});   ');
f.push('});   ');
f.push('      ');
f.push('// (3)GET /edit/id    ');
f.push('app.get("/editar/:id_m/:id_d", function (req, res) {    ');
f.push('    const idm = req.params.id_m;    ');
f.push('    const idd = req.params.id_d;    ');
f.push(' const query = [idm, idd];    ');
f.push('const sql = "SELECT * FROM '+tabMestre+', '+tabDetalhe+' WHERE ('+to_pk+'='+from_fk+') and ('+mestrePk+' =?) and ('+detalhePk+' =?)";    ');
f.push('db.get(sql, query, function (err, row) {    ');
f.push('  if (err) {    ');
f.push('    return console.error(err.message);    ');
f.push(' }    ');
f.push('res.render("editar.ejs", { dados: row });    ');
f.push(' });    ');
f.push('});    ');
f.push('      ');
f.push('// POST /edit/id   ');
f.push('app.post("/editar/:id_m/:id_d", function (req, res) {   ');
f.push('let id_m = req.params.id_m; //recebe parâmetro id da pagina editar.ejs ');
f.push('let id_d = req.params.id_d; //recebe parâmetro id da pagina editar.ejs ');

//f.push('let dadosMestre = [req.body.Campo_mestre1, req.body.Campo_mestre2, id_m]; ');

var par1='let dadosMestre = [', par2='', par3=' id_m];';
for (let parame of tmestre) {   
    if (parame.pk != 1 && from_fk!=parame.name) {
        par2+='req.body.'+parame.name+',';  
    }
}    
f.push(' '+par1+par2+par3+ ' ');


//() montagem SQL UPDATE p/busca de campos de tabela MESTRE
f.push('// POST /edit/id - UPDATE tabs. mestre e detalhes  ');
var parti0='let sql1 = "UPDATE '+tabMestre+' SET ';
var parti1='', parti2='';
for (let campo of tmestre) {   
    if (campo.pk != 1) parti1+=campo.name+'=?,';
}
parti1=parti1.replace(/(.+),$/, '$1');  //retira ultima virgula dos campos da tab 
parti2=' WHERE ('+mestrePk+' = ?)"; '; 
f.push(' '+parti0+parti1+parti2+'  ');
//fim montagem da SQL update

//f.push('let dadosDetalhes = [req.body.Atributo_detalhe1, req.body.Atributo_detalhe2, id_d];  ');
var par1='const dadosDetalhe = [', par2='', par3='id_d ];';
for (let parame of tdetalhes) {   
    if (parame.pk != 1 && from_fk!=parame.name) {
        par2+='req.body.'+parame.name+',';  
    }
}    
f.push(' '+par1+par2+par3+ ' ');


//() montagem SQL UPDATE p/busca de campos de tabela DETALHES
var part0='let sql2 = "UPDATE '+tabDetalhe+' SET ';
var part1='', part2='';
for (let parame of tdetalhes) {   
    if (parame.pk != 1 && from_fk!=parame.name) part1+=parame.name+'=?,'; //VER INCLUINDO Fk_detelhes ...PODE?????
}
part1=part1.replace(/(.+),$/, '$1');  //retira ultima virgula dos campos da tab 
part2=' WHERE ('+detalhePk+' = ?)"; '; 
f.push(' '+part0+part1+part2+'  ');
//fim montagem da SQL update

f.push('db.run(sql1, dadosMestre, function (err) {  ');
f.push('  if (err) {  ');
f.push('return console.error(err.message);  ');
f.push('}  ');
f.push('});  ');
f.push('      \n ');
f.push('db.run(sql2, dadosDetalhe, function (err) {  ');
f.push('if (err) {  ');
f.push('return console.error(err.message);  ');
f.push('}  ');
f.push('res.redirect("/");  ');
f.push('});  ');
f.push('});  ');
f.push('      ');
f.push('// (4)GET /consulta em mestre para inserirDetalhe  ');
f.push('app.get("/inserirD/:id_m/:id_d", (req, res) => {  ');
f.push('let idm = req.params.id_m;  ');
f.push('let idd = req.params.id_d;  ');
f.push('let query = [idm, idd];  ');
f.push('let sql = "SELECT * FROM '+tabMestre+', '+tabDetalhe+' WHERE ('+mestrePk+'='+from_fk+') and ('+mestrePk+' =?) and ('+detalhePk+' =?)"; ');
f.push('db.get(sql, query, function (err, row) {  ');
f.push('  if (err) {  ');
f.push('return console.error(err.message);  ');
f.push(' }  ');
f.push('res.render("inserirD.ejs", {   ');
f.push('dado: row,  ');
for (let parame of tdetalhes)  //campos tab. detalhes p/definicao em inserirD.ejs
  f.push(' '+parame.name+' : "",  ');  
f.push(' });  ');
f.push(' });  ');
f.push('  ');

f.push('app.post("/inserirD/:id_m/:id_d", (req, res) => { ');
f.push('    let idm = req.params.id_m; ');
f.push('    let idd = req.params.id_d; ');
camposTabDeta(f); //() montagem SQL INSERT p/busca de campos de tabela
f.push('    //insere chave PK (idm) de mestre na chave FK de detalhes (FK_detalhe) ');
var par1='const dadosDetalhe = [', par2='', par3='];'; 
for (let parame of tdetalhes) {   
    if (parame.pk != 1 ) { //busca campos em tb detalhes e substui "idm" por variável FK
     if (from_fk == parame.name) {
        par2+='idm,';
     } else {
        par2+='req.body.'+parame.name+',';
    }
}  

}
f.push(' '+par1+par2+par3+ ' ');

f.push('    db.run(sql3, dadosDetalhe, function (err) { ');
f.push('      if (err) { ');
f.push('        return console.error(err.message); ');
f.push('      } ');
f.push('      res.redirect("/"); ');
f.push('    }); ');
f.push('    }); ');
f.push('  }); //fim do escolpo do app.get inserirDetalhe ');
f.push('      ');
f.push('// (4)GET /delete/5 ');
f.push('app.get("/delete/:id_m/:id_d", function (req, res) { ');
f.push('    const idm = req.params.id_m; ');
f.push('    const idd = req.params.id_d; ');
f.push('    const query = [idm, idd]; ');

f.push('let sql = "SELECT * FROM '+tabMestre+', '+tabDetalhe+' WHERE ('+mestrePk+'='+from_fk+') and ('+mestrePk+' =?) and ('+detalhePk+' =?)"; ');
f.push('    db.get(sql, query, function (err, row) { ');
f.push('      if (err) { ');
f.push('        return console.error(err.message); ');
f.push('      } ');
f.push('      res.render("delete.ejs", { dados: row }); ');
f.push('    }); ');
f.push('  }); ');
f.push('      ');
f.push('// POST /delete/5  ');
f.push('app.post("/delete/:id_d", function (req, res) {  ');
f.push('    const idd = req.params.id_d;  ');
f.push('    const sql = "DELETE FROM '+tabDetalhe+' WHERE '+detalhePk+' = ?";  ');
f.push('    db.run(sql, idd, function (err) {  ');
f.push('      if (err) {  ');
f.push('        return console.error(err.message);  ');
f.push('      }  ');
f.push('      res.redirect("/");  ');
f.push('    });  ');
f.push('  });  ');
f.push('    ');
f.push('  // GET /delete mestre e seus detalhesLS  ');
f.push('  app.get("/deletaTodos/:id_m", function (req, res) {  ');
f.push('    const idm = req.params.id_m;  ');
f.push('    const sql = "DELETE FROM '+tabMestre+' WHERE '+mestrePk+' = ?";  ');
f.push('    db.run(sql, idm, function (err) {  ');
f.push('      if (err) {  ');
f.push('        return console.error(err.message);  ');
f.push('      }  ');
f.push('      res.redirect("/");  ');
f.push('    });  ');
f.push('  });  ');
f.push('      ');
f.push('  //instacia o servidor na porta 8080  ');
f.push('  app.listen(8080, () => {  ');
f.push('      console.log("SERVIDOR ativo. Acesse http://localhost:8080");  ');
f.push('  });  ');
//fim do fonte
f = f.join(' \n ');

// escreve fonte do arquivo de config. app.js
fs.writeFile('./apps/'+projeto+'/app.js', f, (err) => {  
    if (err) throw err;
});

}  //fim da função func_appapp.use(express.json());

 //() montagem SQL INSERT e UPDATE p/busca de campos de tabela
function camposTabDeta(f) {
    var parti_0 = 'let sql3 = "INSERT INTO ' + tabDetalhe + ' (';
    var parti_1 = '', parti_2 = '', parti_3 = '';
    for (let campo of tdetalhes) {
        if (campo.pk != 1) parti_1 += campo.name + ',';
    }
    parti_1 = parti_1.replace(/(.+),$/, '$1');  //retira ultima virgula  
    var parti_2 = ') VALUES ( ';
    for (let parame of tdetalhes) {
        if (parame.pk != 1) parti_3 += ' ?,';
    }
    parti_3 = parti_3.replace(/(.+),$/, '$1');  //retira ultima virgula  
    var parti_4 = ' )";';
    f.push(' ' + parti_0 + parti_1 + parti_2 + parti_3 + parti_4 + ' ');
//fim montagem da SQL insert
}

module.exports = {fApp: fApp};
 



