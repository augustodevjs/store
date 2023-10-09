## 🖼️ Front-End

<div>
  <img src="./frontend/src/shared/assets/client-list.png">
  <img src="./frontend/src/shared/assets/product-list.png">
  <img src="./frontend/src/shared/assets/add-preference.png">
  <img src="./frontend/src/shared/assets/add-preference-successful.png">
  <img src="./frontend/src/shared/assets/list-preferences.png">
</div>

<p align="justify">
  A organização de pastas do projeto no Front-End é feita dividindo as responsabilidades em módulos para organizar o projeto como um todo e facilitar o desenvolvimento. Os modulos são:
</p>

- **components**: Módulo que comporta todos os componentes feitos no projeto;
- **core**: Módulo que possui arquivos e utilitarios essenciais para o funcionamento da aplicação;
- **domain-types**: Módulo referente a todos os tipos criados com o auxilio do Typescript;
- **services**: Módulo que comporta todos os services que fazem comunicação com o Back-End;
- **styles**: Módulo que comporta estilizações globais;
- **pages**: Módulo que comporta todos os componentes referentes às páginas, seus modais, hooks, serviços que se comunicam e etc.

## 💡 Rodando o Front-End

### Pre-requisitos

<p>Antes de tudo é necessário instalar: </p>

- <a href="https://nodejs.org/pt-br/download/package-manager">Node.js</a>

- Instalando o TypeScript

  ```sh
  npm install -g typescript.
  ```

- Instalando o yarn
  ```sh
  npm install --global yarn
  ```
- Verificando se o yarn está instalado

  ```sh
  yarn --version
  ```

- Clonando o respositório

  ```sh
  git clone https://github.com/augustodevjs/teste-tecnico-fullstack
  ```

- Entre no diretório do front

  ```sh
  cd ./frontend
  ```

- Variável de Ambiente

  ```sh
  crie um arquivo chamado .env e copie a url da api para esse arquivo de acordo com .env.example
  ```

- Installando as dependencias do projeto com yarn

  ```sh
  yarn
  ```

- Rodando o projeto no modo de desenvolvimento
  ```sh
  yarn run dev
  ```

## :desktop_computer: Principais tecnologias utilizadas no Front-End

- <a href="https://www.typescriptlang.org">TypeScript</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a>
- <a href="https://react.dev">React</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a>
- <a href="https://styled-components.com">Styled Components</a>
- <a href="http://reactcommunity.org/react-modal/">React Modal</a>
- <a href="https://react-hook-form.com">React Hook Form</a>
- <a href="https://sweetalert2.github.io">Sweet Alert</a>

## ⌨️ Back-End

<p align="justify">
  Foi utilizado o framework .NET 7 e Entity Framework com a arquitetura divida em módulos e a conexão com o banco de dados postgresql, mas com a organização de pasta 
  seguindo a modelagem de DDD (Domain Driven Desing) para facilitar a implementação de regras de negócios e outros processos complexos.
</p>
<p align="justify">
  Dito isso, o projeto foi estruturado em 5 "camadas" que são:
</p>

- **API**: Comporta configurações da aplicação e controllers;
- **application**: Cuida da comunicação com o Domain, comportando: classes de serviços, interfaces, DTOs, etc;
- **infra**: Comporta o suporte geral às demais implementações como repositories, mappers, contextos, etc;
- **domain**: Comporta todas as entidades, interfaces e classes de serviços;
- **tests**: Comporta todos os testes das services.

## 💡 Rodando o Back-End

### Pre-requisitos

- NET SDK
- Postgresql
- DBeaver

- Entre no diretório do back

  ```sh
  cd ./backend/src/Store.API
  ```

- Rode a API

  ```sh
  dotnet run
  ```

- Para vê os testes unitários do backend entre no diretório

  ```sh
  cd ./backend/tests/Store.Application.Tests
  ```

- Rode os Testes

  ```sh
  dotnet test
  ```

## :desktop_computer: Principais tecnologias utilizadas no Back-End

- <a href="https://learn.microsoft.com/pt-br/dotnet/csharp/">C#</a>
- <a href="https://dotnet.microsoft.com/en-us/download/dotnet/6.0">.NET 7</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Entity Framework</a>
- <a href="https://automapper.org">AutoMapper</a>
- <a href="https://dev.mysql.com/downloads/installer/">Postgresql</a>
- <a href="https://dbeaver.io/download/">DBeaver</a>
- <a href="https://fluentvalidation.net">FluentValidation</a>
