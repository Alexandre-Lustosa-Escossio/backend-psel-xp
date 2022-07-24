# XP Inc Api - Corretora e Banco

Uma Api para compra e venda de ativos, além de operações em conta corrente. Desenvolvida como parte do processo seletivo para o cargo de desenvolvedor de software da empresa XP Inc. 
##  Stack
<div style="display: inline_block">
  <img align="center" alt="Alexandre-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Alexandre-Node" height="55" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg">
   <img align="center" alt="Alexandre-Express" height="55" width="70" src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg">
  <img align="center" alt="Alexandre-Sequelize" height="55" width="70" src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original-wordmark.svg">
  <img align="center" alt="Alexandre-Mocha" height="35" width="45" src="https://github.com/devicons/devicon/blob/master/icons/mocha/mocha-plain.svg">  
</div>

## Overview

<details>
  <summary><strong>📝 Planejamento do Projeto</strong></summary><br />
  
Antes de iniciar o projeto, fiz um brainstorming tentando entender que entregas, além das minimas requisitadas, poderiam ser adicionadas ao projeto para deixá-lo mais robusto. Ao fim desse processo, realizei o planejamento do projeto separando os entregáveis entre extras e essenciais, cada entregável consistia no caminho percorrido por uma solicitação do usuário, desde o recebimento da solicitação até a consulta no banco de dados e o retorno ao cliente. Cada uma das etapas nesse percurso tornou-se então um item de checklist ( ou um outro entregável separado, caso fosse entendido que sua complexidade seria grande o suficiente para ser considerada uma entrega unica). Para melhor visibilidade das entregas e dos processos, utilizei o [Trello](https://trello.com/b/nG0eODsg/backend-api) para registrar o andamento das atividades.

 </details>


<details>
  <summary><strong>🎯 Tomadas de Decisão</strong></summary><br />
  
- Uma vez que não foi informado o banco de dados utilizado em produção, as interações com o banco de dados ficaram a cargo de um ORM, para maior facilidade de migração caso necessário. O ORM de escolha foi o [Sequelize](https://sequelize.org/) por motivos de conhecimento prévio.
- Optei pelo desenvolvimento da aplicação em JS funcional devido a maior agilidade de desenvolvimento nessa stack quando comparado ao TS. Essa agilidade teve bastatnte peso na decisão devido à grande quantidade de entegas extra a serem implementadas, frente o curto prazo de entrega, visando tornar a aplicação mais completa. Além disso, bugs acontecem e, durante todo o período de curso na Trybe, em JS, fui exposto a diversos deles, assim, caso acontecesse algum bug seria bem mais provavel que eu já soubesse onde procurar a resposta, em contraste ao TS, o qual ainda é novo para mim e me tomaria consideravelmente mais tempo para resolver conflitos.

 </details>
 
 <details>
  <summary><strong>⌛ Gestão do Tempo</strong></summary><br />
Devido ao curto prazo para a entrega do projeto ( 10 dias ) e às já citadas features extras, além da necessidade de continuar realizando as atividades da trybe em paralelo, fiz um planejamento no qual dedicaria 4 horas diáias para a trybe e um mínimo de 4 horas diárias para a xp, podendo esse tempo ser extendido caso sentisse necessidade, totalizando assim, um minimo de 40 horas dedicadas ao desafio. Essas 40 horas foram divididas da seguinte maneira: 

- 4 Horas Iniciais -> Planejamento do Projeto e Modelagem do Banco de Dados
- 28 Horas -> Implementação de requisitos e testes
- 4 Horas -> Code Review
- 4 Horas Finais -> Documentação da Aplicação

  </details>
  
 <details>
  <summary><strong>🔖 Premissas Iniciais</strong></summary><br />
  
- A implementação de validações de saldo do cliente para a compra de ações é um requisito extra, desenvolvido caso haja tempo hábil.
- As ordens ocorrem dentro da própria corretora, sendo assim, clientes xp compram e vendem apenas de clientes xp. Na vida real a requisição de compra/venda seria enviada para a B3 e a resposta tratada.
- Compras são feitas a preço de mercado. O Valor de venda/compra de uma ordem será calculado no momento de sua colocação, consultando uma api de dados do mercado financeiro.
- O algoritmo de matching de ordens seria capaz de lidar com ordens de compra em quantidade superior à disponível para venda, porém, como um dos requisitos básicos é de que se retorne um erro para quando esse for caso, a implementação seguiu esse padrão.
- O mercado tem liquidez suficiente para que no momento em que uma ordem de compra é solicitada, já se possa considerar que o cliente possui aquele ativo em carteira. Do mesmo modo, o mercado é liquido o suficiente para que, no momento em que uma ordem de venda é colocada, a quantidade é imediatamente deduzida de sua carteira de ativos.

</details>
  
 <details>
  <summary><strong>⚙️ Modelagem do Banco de Dados</strong></summary><br />
  
![db-schema](https://github.com/Alexandre-Lustosa-Escossio/backend-psel-xp/blob/master/src/images/dbSchema.png)

</details>

<details>
  <summary><strong>📂 Arquitetura da Aplicação</strong></summary><br />
A aplicação foi desenvolvida seguindo o padrão MSC (Model, Service, Controller). Neste padrão os Controllers ficam responsáveis por chamar o service correto para a requisição e retornar o Status HTTP necessário de acordo com a resposta, o Services são responsáveis por invocar o model correto e aplicar as regras de negócio nos dados retornados, devolvendo ao controller as informações no formato correto, enquanto os Models são responsáveis por se comunicar diretamente com o banco de dados e fazer o CRUD (Create, Read, Update and Delete) dos dados.
</details>

<details>
  <summary><strong>🔐 Validações e Segurança</strong></summary><br />
  
- Ao se cadastrar, os dados pessoais do usuario, exceto a senha, são salvos na entidade Customers. A senha, por sua vez, é encriptada (hashed) e salva em uma entidade diferente chamada Credentials, ligada a Customers por meio do id do usuário.
- Só é possível realizar operações de compra, venda, saque, deposíto e consulta de posse do token de autorização enviado ao realizar o login com sucesso.
- Não é possível realizar a compra de ativos caso a quantidade enviada no payload seja menor ou igual a zero, ou ainda não numérica. Além disso, não é possível comprar uma quantidade maior que a quantidade disponível a venda.
- Assim como na compra, não é possível realizar a venda de ativos caso a chave quantidade enviada no payload seja menor que zero, ou não numérica. Além disso, não é possível vender uma quantidade maior que a disponível em carteira.
- Não é possível, para um cliente, buscar pela composição de uma carteira que não seja a sua propria.
- Não é possível depositar quantidades não numéricas ou menores ou iguais a zero. Além disso, não é possível sacar um valor maior que o disponível em conta.
- Não é possível depositar quantidades não numéricas ou menores ou iguais a zero.
- As operações de retirar/adicionar ativos à carteira e retirar/adicionar ordens de compra/venda são feitas em conjunto por meio de uma transaction, caso uma das duas dê errado, ambas são canceladas. Assim, não ocorre de uma ação ser adicionada a uma carteira sem que sua ordem de compra seja registrada.

</details>
  
<details>
  <summary><strong>‼️ Desafios</strong></summary><br />  
  
Ao iniciar o projeto, o primeiro grande desafio foi planejar quais seriam as entidades e como elas iriam se relacionar, já prevendo a possibilidade de adicionar novas interações sem a necessidade de remodelagem do banco. Após isso, fazer o setup dessas entidades no sequelize também foi particularmente cansativo, devido ao quão reconhecidamente confusos podem ser seus padrões e comandos. Além disso, por um bom tempo fiquei em um impasse quanto à linguagem e ao paradigma no qual desenvolveria a aplicação, tendo que avaliar o tradeoff entre a confiabilidade do TypeScript com POO e a agilidade de desenvolvimento com JavaScript funcional. Desenvolver os testes também foi profundamente desafiador, uma vez que fui exposto a um problema pelo qual ainda não tinha passado durante os projetos da trybe: descobri durante o desafio que não é possível mockar uma função que é chamada dentro de outra função presente no mesmo módulo, pois, ao compilar o arquivo, a referência à função é perdida e o mocha não tem como saber que ela foi chamada. Depois de muita pesquisa descobri uma técnica chamda [Link Seams](https://sinonjs.org/how-to/link-seams-commonjs/), utilizada pelo pacote [Rewire](https://github.com/jhnns/rewire), por meio do qual foi possível mockar as funções. Por fim, levei bastante tempo para chegar a uma solução para o algoritmo de matching de ordens de compra e venda de ativos, uma vez que o mesmo demandava entendimento tanto de regras de negócio tanto da lógica desse mercado.

</details>
<details>
  <summary><strong>🚀 Pontos de Melhoria</strong></summary><br />  
  
- Criar entidade de saldo na conta de ativos, separada da conta corrente e validar saldo do cliente antes de realizar operação de compra.
- Habilitar transferência de fundos entre conta corrente e conta de ativos.
- Habilitar ordens a preço arbitrário.
- Fazer com que o registro e matching de ordens seja processado em memória e salvo de tempos em tempos visando escalabilidade.

</details>

## Utilização
Caso não queira realizar testes localmente acesse https://backend-api-xp.herokuapp.com/ e realize as requisições para os endpoints listados na documentação.
### Setup
 ```
    # terminal
    $ git clone https://github.com/Alexandre-Lustosa-Escossio/backend-psel-xp.git
 ```
 ```
    # editor
    .../backend-psel-xp/
    
    $ npm install
    $ npx sequelize db:create
    $ npx sequelize db:migrate
    $ npx sequelize db:seed:all
    $ npm run test
 ```

### Inicialização
```
    $ npm run dev
    Server is running on port: 3000
```
### Requisições

Para uma lista de todas as requisições e respostas possíveis do servidor, acesse a documentação em:
localhost:3000/docs/ ou https://backend-api-xp.herokuapp.com/docs
 
