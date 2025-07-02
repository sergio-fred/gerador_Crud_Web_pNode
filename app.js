//VERSAO c/multer - funcional v58
const express = require('express');
const session = require('express-session'); //controle de sessoes
const fs = require('fs-extra'); //gravar, copiar diretorios
const flash = require("connect-flash"); //mensagens para Ejs
const app = express(); // framework App
const sqlite = require("sqlite3"); //drive do Sqlite
const db = new sqlite.Database("./db/usuario.db");//conector Sqlite
const admz = require('adm-zip');//compacta projeto
const multer = require('multer');// upload bd no servidor

app.use(express.urlencoded({extended: false}));  
app.set('view engine', 'ejs');

//VARIAVEIS GLOBAIS
global.ema = ''; // email usuário
//global.projeto = '';  //nome da projeto
global.aplicacao = ''; //nome da App
global.bdados=''; //nome do BD 
global.tabMestre=''; //tabela mestre
global.tabDetalhe=''; //tabela detalhes
global.from_fk = ''; //nome da chave FK de detalhes que referencia (pk) de mestre
global.table_pk = ''; //nome tabela referenciada (pk)
global.to_pk = ''; //id da tabela referenciada (pk)
global.tmestre = []; //dataset da tab mestre
global.tdetalhes = []; //dataset da tab mestre
global.mestrePk = ''; //chave primaria a tab mestre
global.detalhePk= ''; //chave primaria a tab detalhe
global.upload=''; //upload arquivo do BD
global.endere = ''; //endereco para o storage do multer

//declaracao dos módulos para gravar Ejs
const tabelas = require('./tabelas.js');
const f_app = require('./f_app.js');
const f_index = require('./f_index.js');
const f_editar = require('./f_editar.js');
const f_inserirm = require('./f_inserirm.js');
const f_inserird = require('./f_inserird.js');
const f_delete = require('./f_delete.js');

app.use(session({ 
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

app.get('/', function (req, res) {
      const sql = "SELECT * FROM users";
      db.all(sql, [], function (err, rows) {
        if (err) {
          return console.error(err.message);
        }
          res.render("index", { dados: rows });
      });
 });
  

app.post('/login', function (req, res) {
  //prepara variaveis para o nome do PROJETO
  ema = req.body.email;
 const pas = req.body.password;
  const query = [ema, pas];
  const sql = "SELECT id,email,password FROM users WHERE (email=?) and (password=?)";
  db.get(sql, query, function (err, row) {
    if (row === undefined) {
        req.flash('msg', "Usuário NÃO LOGADO. Solicite sua senha no email programador1.com@gmail.com");
        res.locals.message = req.flash();
        res.render('logout.ejs', {});
    } else {
          //prepara variaveis para o nome do PROJETO
           const e = parseInt(getRandomInt(1000, 9000));
           const projet = ema.substring(0,5)+e; //nome definitivo de projN (N=1,2,3,...)
           endere = 'apps/'+projet;
           console.log("0-criacao var endere: "+endere);

          req.flash('msg', "Escolha o Banco de Dados SQLite do seu projeto...");
          res.locals.message = req.flash();
          res.render('login', {
          email: ema, 
          dados: row,
          project: projet
          });
          //atribui nome ao projeto
          global.projeto = projet;
          req.session.email = ema;
          //grava o diretório apps com atributos totais ler/gravar (cod. 0777)
          var dir = './apps/'+projeto;
          var oldmask = process.umask(0);
          fs.mkdir(dir, '0777', function (err) {
           process.umask(oldmask);
          });
    }    
 });
}); 

// declara diretorio padrão uploads
const storage = multer.diskStorage({ 
   destination: (req, file, cb) => {cb(null, endere)}, 
   filename: (req, file, cb) => {cb(null, file.originalname)},
 });
upload = multer ({storage: storage});

//rotas salvar bd com multer e reconhecer esquema do BD
app.post('/carrega', upload.single('file'), function (req, res, next) {
  console.log("1-depois multer var endere: "+endere);
  bdados = req.body.bdados;
  aplicacao = projeto;
  console.log("2-var aplicacao: "+aplicacao);
  console.log("3-var bdados: "+"./apps/"+projeto+"/"+bdados);
  const db_sql = new sqlite.Database("./apps/"+projeto+"/"+bdados); 
 
 //para verificar se o projeto já existe e emitir mensagem 
 // if (fs.existsSync("./"+projeto)) { 
    //mensagem aqui
 // } 
 
  // sql para mostrar em Ejs a instrucao Create das tabelas referenciadas
  const sql1 = "SELECT sql FROM sqlite_master where type ='table' and name<>'sqlite_sequence'";
    db_sql.all(sql1, [], function(err, query1) { 

  //dataset com nome das tabelas mestre e detalhes
  const sql2 = "SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'";
    db_sql.all(sql2, [], function(err, query2) {
    tabMestre = query2[0].name;
    tabDetalhe = query2[1].name;
   
  //dataset com campos da tabela que referencia (pk)   
  const sql3 ="SELECT * FROM pragma_foreign_key_list(?)";
    db_sql.all(sql3, query2[1].name, function(err, query3) { 
      from_fk = query3[0].from;
      table_pk = query3[0].table;
      to_pk = query3[0].to;
       
  //dataset com campos, nome e pk da tabela mestre 
  const sql4 = "SELECT cid, name, pk FROM pragma_table_info(?)"; //estrutura da tabela Mestre
    db_sql.all(sql4, query2[0].name, function(err, query4) {
      tmestre = query4;
      chaveMestre_pk();
     
   //dataset com campos, nome e pk da tabela detalhes     
  const sql5 = "SELECT cid, name, pk FROM pragma_table_info(?)"; //estrutura da tabela Detalhes
    db_sql.all(sql5, query2[1].name, function(err, query5) {
      tdetalhes = query5;
      chaveDetalhes_pk();
      
      req.flash('msg', "Estrutura do BD SQLite em tabelas mestre-detalhes.");
      res.locals.message = req.flash();
      res.render('logado.ejs', {
        project: projeto,  //nome da aplicação/projeto
        bdados: bdados,    //nome do BD 
        criaTabelas: query1,  
        Tabelas: query2,
        Col: query3,
        Mestre: query4,
        Detalhes: query5,
      });
    }); //fim sql5
   }); //fim sql4
  }); //fim sql3
 }); //fim sql2
 }); //fim sql1

   tabelas.mostraTabelas(projeto);  //chama função externa
   setTimeout(codigoEjs, 7000); //espera 7 seg para executar função de Ejs

   // destroi conexão de BD
   db_sql.close((err) => { if (err) { console.error(err.message);}
   console.log('Conexão BD fechada.');});
}); //fim do app.post() /carrega

//sair do App e encerrar sessao
app.get('/logout', function (req,res) {
  console.log("logout e destroi session");
  req.session.destroy(function (err) {
    res.redirect('/'); 
   });
})

// ROTAS para /routes
//app.use('/', require('./routes/carregabd'));

// rota para zip e download do projeto
app.get('/downlo',function(req,res){
  var zp = new admz();
  zp.addLocalFolder(__dirname+'/'+'apps/'+aplicacao);
  const projeto_crud = aplicacao+'.zip';
  const data = zp.toBuffer();
  res.set('Content-Type','application/octet-stream');
	res.set('Content-Disposition',`attachment; filename=${projeto_crud}`);
	res.set('Content-Length',data.length);
	res.send(data);
})

//abre pag. menu ajuda
app.get('/ajuda', function(req, res){ 
  res.render('ajuda.ejs', {}); 
});

//abre pag. menu node/express/sqlite
app.get('/sobreap', function(req, res){ 
  res.render('sobreapp.ejs', {}); 
});

//chama funcoes para alimentar .ejs e .js
function codigoEjs() {
  f_app.fApp(bdados,tabMestre,tabDetalhe,from_fk,to_pk,tmestre,tdetalhes,mestrePk,detalhePk,projeto); //chama função gravar ./app.js
  f_index.funcIndex(tmestre,tdetalhes,projeto);
  f_inserirm.fInserirm(tmestre,tdetalhes,projeto);
  f_inserird.fInserird(tmestre,tdetalhes,mestrePk,detalhePk,projeto);
  f_editar.fEditar(mestrePk,detalhePk,tmestre,tdetalhes,projeto);
  f_delete.fDelete(mestrePk,detalhePk,tmestre,tdetalhes,projeto);   
}

function chaveMestre_pk() {
  for (let i=0; i < tmestre.length; i++) { //busca pk tabela mestre
    if (tmestre[i].pk == 1) mestrePk = tmestre[i].name;
  }  
}

function chaveDetalhes_pk() {
  for (let i=0; i < tdetalhes.length; i++) { //busca pk tabela mestre
    if (tdetalhes[i].pk == 1) detalhePk = tdetalhes[i].name;
  }  
}

// gera randomico para numero do nome do projeto
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

//instancia servidor (em kinghost: 21145)
const PORT = process.env.PORT || 21145;
app.listen(PORT, ()=>{
  console.log("Servidor ativo. Acesse: http://localhost:"+PORT+" ");
});