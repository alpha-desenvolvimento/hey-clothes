# Padrões do projeto

## Table of contents
1. [Nomes de pastas, arquivos, classes, variáveis e métodos](#Nomes-de-pastas,-arquivos,-classes,-variáveis-e-métodos)
2. [Métodos](#Métodos)
3. [Comentários iniciais](#Comentários-iniciais)
4. [Versionamento](#Versionamento)
5. [Branchs, Commits e Merge](#Branchs,-Commits-e-Merge)
    1. [Branchs](#Branchs)
    2. [Commits](#Commits)
6. [Deploy](#Deploy)
7. [Boas Práticas](#Boas-Práticas)

## Nomes de pastas, arquivos, classes, variáveis e métodos

Sempre utilizar nomes em inglês e descritivos, por exemplo:

```
📦 ...
 ┣╸ 📂 components
 ┃  ┣╸ 📂 login_cmp
 ┃  ┃  ┣╸ 📜 index.js
 ┃  ┃  ┗╸ 📜 style.scss
 ┃  ┗╸ ...
 ┃
 ┣╸ 📂 controllers
 ┃  ┣╸ 📜 account_crt.js
 ┃  ┣╸ 📜 product_crt.js
 ┃  ┣╸ 📜 home_crt.js
 ┃  ┗╸ ...
 ┃
 ┣╸ 📂 pages
 ┃  ┣╸ 📂 home_pg
 ┃  ┃  ┣╸ 📜 index.js
 ┃  ┃  ┗╸ 📜 style.scss
 ┃  ┗  ...
 ┗ ...
```

```javascript
class Account_crt {
  constructor() {}
  create() {
    ...
    return something
  }
  update() {
    ...
    return something
  }
}
```

```javascript
function validateCpf(cpf){
    ...
    return someReturn
}
```

---


## Métodos

Idealmente refatorar métodos até que cada um faça apenas uma coisa, por exemplo:

```javascript
//Autentica e loga o usuario
function Auth() {
  /*
  Código de autenticação
  ...
    ...
  ...
  */

  /*
    Código de Login
    ...
      ...
      ...
      ...
    ...
  */
}
```

O código acima se tornaria algo parecido com:

```javascript
function authenticateUser() {
  /*
  Código de autenticação
  ...
    ...
  ...
  */
}

function logInUser() {
  /*
    Código de Login
    ...
      ...
      ...
      ...
    ...
  */
}
```


---

## Comentários iniciais

Todos os arquivos do projeto devem possuir um autor, data de criação e uma descrição quando aplicável, ex:

```javascript
/*  ------------------------------------------------------- 
@author Gabriel Loch
@created 2020-08-16
@descrition Arquivo genérico para construção de páginas no lado do cliente, não deve ser utilizado como roda direta.
------------------------------------------------------- */
```

---

## Versionamento

Para vesionamento, utilizar o padrão XX.XX.XX, ex: _01.00.00_

O primeiro grupo de dígitos (**01**.00.00) deve ser alterado quando um grande número de alterações for realizado e existe pouca ou nenhuma compatibilidade com a versão anterior

O segundo grupo de dígitos (01.**01**.00) deve ser alterado quando forem alteradas funcionalidades do sistema, mas ainda existe compatibilidade com a versão anterior.

O terceiro grupo de dígitos (01.01.**01**) deve ser alterado quando forem realizadas correções de bugs.

Se possível, criar uma nova versão/branch do sistema ao final de cada sprint.

---

## Branchs, Commits e Merge

### Branchs

- Sempre utilizar a própria branch para desenvolver, nunca desenvolver diretamente em um branch de versão.
- Quando possível, idêntificar a branch em desenvolvimento com o número da história em desenvolvimento (_**HC-1**_)

### Commits

- Sempre fazer um teste completo em todas as alterações realizadas **antes** de fazer o commit, após o merge com a branch de versão, refazer os testes para validar se as alterações funcionam com o resto do ambiente.
- Quando realizado o merge com a branch de homologação, refazer os testes sobre alterações realizadas.
- O assunto do commit deve ser o número o nome da história, ex: 
    - _**HC-1 1**_, criação de novo recurso incrível ABC
    - _**HC-1 2**_, melhoria do recurso ABC (acrescentado validação XYZ)
    - _**HC-1 3**_, alteração de regras no momento da validação XYZ
- Caso seja o commit seja uma correção de bug na história aplicar **\_FIX** ao final do assunto do commit ex: 
    - _**HC-1_FIX 1**_, corrigo erro de validação em regras de negócio
    - _**HC-1_FIX 2**_, corrigido API para correta validação XYZ
- Quando aplicável, adicionar uma descrição do que foi alterado no commit
    - Criação de novo recurso incrível ABC
- Alterações no código fonte devem seguir a rota:
> Branch de desenvolvimento da história > Versão em desenvolvimento > Branch de homologação > Branch master
> 
> ex:
> 
> HC-1 > V01.00.00 > Homol > Master

---

### Merge

Antes do merge para as branchs principais (Master ou Homol), verificar todas as alterações realizadas na versão para atualização no arquivo de [changelog](./changelog.md).

Após o merge, deve ser criado uma nova branch de versão para desenvolvimento de uma nova versão.

---

## Deploy
- Deploys no Heroku para versões diferentes da **branch Master**, devem ser comunicados no grupo préviamente.
    - Esse recurso deverá ser utilizado somente para fins de teste, após a realização de testes, voltar para versão master do projeto.

---

## Boas Práticas

- Evitar loop for dentro de outros loops for (principalmente no banco de dados), utilizar json ou maps no lugar com ID nos nomes de chaves.
- Sempre buscar parametrizar argumentos e validações, evitar chumbar parâmetros no código.