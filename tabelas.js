//modulo para tarefas com tabelas
const fs = require('fs-extra');

function mostraTabelas(projeto) {
     //retira extensao .bd do nome de BD
  //bdados= bdados.split('.').slice(0, -1).join('.');
 
// Copia diretorio, subdir e arquivos se existirem
//fs.copy('./modulo', './apps/'+projeto  , function (err) {  
fs.copy(__dirname+'/modulo', __dirname+'/apps/'+projeto  , function (err) {    
  if (err) {
    console.error(err);
  } else {
    console.log('modulo copiado com sucesso, App ' +projeto+ ' pronto...!' );
  }
});

/* ALTERNATIVA COPIAR PASTAS
const FileSystem = require('pwd-fs');
const pfs = new FileSystem();
async () => {
  await pfs.copy('./path', './dest');
}
*/
//lista arquivos do diretorio USAR DEPOIS NA .ejs
//fs.readdirSync(__dirname).forEach(file => {
//  console.log(file);
//});
} //fim da funcao mostrarTabelas()

module.exports = {mostraTabelas: mostraTabelas};