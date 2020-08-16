# Padrões do projeto

# Table of contents
1. [Nomes de pastas, arquivos, classes, variáveis e métodos](#Nomes-de-pastas,-arquivos,-classes,-variáveis-e-métodos)
2. [Métodos](#Métodos)
3. [Comentários iniciais](#Comentários-iniciais)
4. [Branchs e Commits](#Branchs-e-Commits)
    1. [Branchs](#Branchs)
    2. [Commits](#Commits)
2. [Deploy](#Deploy)
2. [Boas Práticas](#Boas-Práticas)

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

Utilizar o mínimo possível de programação dentro de um algoritmo principal, por exemplo:

```javascript
function createSomething() {
  const name = setSomethingName();
  const someInfo = setSomethingInfo();

  function setSomethingName() {
    return response;
  }
  function setSomethingInfo() {
    return response;
  }
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

@changelog
    2020-08-17 
    - @author Gabriel Loch
    - @description Adicionado suporte a coisas legais 
------------------------------------------------------- */
```

---

## Branchs e Commits

### Branchs

- Sempre utilizar a própria branch para desenvolver, nunca desenvolver diretamente em um branch de versão.
- Quando possível, idêntificar a branch em desenvolvimento com o número da história em desenvolvimento (_**HC-1**_)

### Commits

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

## Deploy
Deploys no Heroku para versões diferentes da **branch Master**, devem ser comunicados no grupo préviamente.

Esse recurso deverá ser utilizado somente para fins de teste, após a realização de testes, de se voltar para versão master.

---

## Boas Práticas

- Evitar loop for dentro de outros loops for (principalmente no banco de dados), utilizar json ou maps no lugar com ID nos nomes de chaves.
- Sempre buscar parametrizar argumentos, evitar chumbar parâmetros no código:\
  ```javascript
  if(produto.type == 'camiseta') //do something
  ```
