# gerador_Crud_Web_pNode
Gerador para CRUD em Node.js. Trata-se de aplicação web em node.js para gerar CRUD em node.js com 2 tabelas relacionadas.
Gerador de CRUD - Node.js, Express, SQLite
App com 2 tabelas relacionadas
Solicite ajuda em programador1.com@gmail.com
Vídeo no Youtube: https://youtu.be/S0i42QFjSbo

a) PROCEDIMENTOS COM BANCO DE DADOS:
Prepare o BD MySQL 5.0+ com 2 tabelas relacionadas em 1-para-muitos (1:n).
O relacionamento (1:n) deve ser referenciado, conforme ex.:
CREATE TABLE tabela_mestre ( ID_mestre integer PRIMARY KEY AUTOINCREMENT, Campo_mestre1 Text, Campo_mestre2 Text )
CREATE TABLE tabela_detalhes ( ID_detalhe integer PRIMARY KEY AUTOINCREMENT, Atributo_detalhe1 text, Atributo_detalhe2 text, FK_detalhe integer, FOREIGN KEY (FK_detalhe) REFERENCES tabela_mestre (ID_mestre) ON DELETE CASCADE);

b) PARA GERAR O App CRUD:
Ao abrir o App acessa a internet, escolha o banco de dados SQLite com 2 tabelas relacionadas.
1) Escolha o BD que vai produzir o App Node.js.
2) Vefique se as tabelas estão realmente referenciadas (1:N)
3) Caso não esteja, interrompa o processo faça edição na modelagem de dados para (1:N)
4) Volte para o item 1, verifique o nome do projeto (sem espaço, acento, pontuação).
5) Clique no botão para produzir o App e aguardar o processamento.

c) ESTRUTURA DO BD e o CRUD GERADO:
O App mostrará a estrutura do seu BD para conferência
Estando tudo correto, uma pasta será criada no disco com o App Node.js.

d) EXECUTAR O CRUD GERADO:
Você precisará ter o Node.js versão 10+ instalado. Ver em https://nodejs.org/pt-br/
Instale o Node.js.
Decompacte o arquivo gerado numa pasta com o nome do projeto.
Abra o console de comando do sistema operacional (no Windons 10, win+R, digite 'CMD').
Abra a pasta do projeto e execute o servidor Node.js com: ' <node "Nome do projeto"> '
Abra o App gerado no navegador, via endereço http://localhost:3000
e) REQUISITOS DE TECNOLOGIA
Node.js, versão 14.0
Express, versão 4.17.1
SQLite, versão 5.0.2
Ejs, versão 3.1.6
© Copyright 2021 - https://www.programador1.com
