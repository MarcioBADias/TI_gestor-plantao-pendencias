# TI Gestor de Plantão e Pendências

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge">
  </p>

## Sobre o Projeto

O **TI Gestor de Plantão e Pendências** é uma aplicação web desenvolvida para otimizar a organização e o acompanhamento das atividades de uma equipe de Tecnologia da Informação. O objetivo principal é proporcionar uma interface clara para gerenciar os plantões da equipe e as pendências e tarefas associadas, garantindo que nada seja esquecido e que o fluxo de trabalho seja eficiente.

A aplicação busca simplificar a comunicação e a rastreabilidade das tarefas, sendo uma ferramenta essencial para equipes de TI que precisam de uma visão rápida sobre quem está de plantão, quais tarefas estão em andamento, pendentes ou concluídas.

## Funcionalidades

* **Registro de Plantões:** Gerencie os membros da equipe que estão de plantão em determinados períodos.
* **Gerenciamento de Pendências:** Adicione, visualize e atualize o status de tarefas e pendências da equipe.
* **Visualização de Status:** Acompanhe o progresso das pendências (em andamento, pendente, concluída, etc.).
* **Interface Intuitiva:** Design focado na usabilidade para facilitar o dia a dia da equipe.

## Tecnologias Utilizadas

* **ReactJS:** Biblioteca JavaScript para construção da interface de usuário dinâmica e reativa.
* **JavaScript (ES6+):** Linguagem de programação principal.
* **CSS:** Para estilização e responsividade da aplicação.
* **React Router DOM (provável):** Para navegação entre diferentes seções da aplicação.
* **Hooks (useState, useEffect, useContext, useReducer, etc.):** Para gerenciamento de estado e lógica de componentes.
    * **Priorização do `useReducer`:** O projeto foi concebido com uma preferência por `useReducer` para o gerenciamento de estados complexos, visando uma lógica de estado centralizada e de fácil manutenção.

## Como Executar o Projeto Localmente

Siga estas instruções para configurar e rodar o projeto em sua máquina de desenvolvimento.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/MarcioBADias/TI_gestor-plantao-pendencias.git](https://github.com/MarcioBADias/TI_gestor-plantao-pendencias.git)
    ```
2.  **Navegue até o Diretório do Projeto:**
    ```bash
    cd TI_gestor-plantao-pendencias
    ```
3.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando a Aplicação

1.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm start
    # ou
    yarn start
    ```
    Isso abrirá a aplicação no seu navegador padrão em `http://localhost:3000`.

## Estrutura do Projeto

A estrutura do projeto segue as convenções comuns de aplicações React, com componentes, lógica e estilos organizados para modularidade e fácil manutenção.

TI_gestor-plantao-pendencias/
├── public/
│   └── index.html
├── src/
│   ├── assets/       # Imagens, ícones, etc.
│   ├── components/   # Componentes React reutilizáveis
│   │   ├── CardPlantao/
│   │   │   ├── index.jsx
│   │   │   └── style.css
│   │   ├── InputField/
│   │   │   ├── index.jsx
│   │   │   └── style.css
│   │   └── ...
│   ├── contexts/     # (Opcional, se houver) Context API para estado global
│   ├── hooks/        # Hooks personalizados
│   ├── pages/        # Páginas da aplicação (rotas principais)
│   │   ├── Home/
│   │   │   ├── index.jsx
│   │   │   └── style.css
│   │   ├── Pendencias/
│   │   │   ├── index.jsx
│   │   │   └── style.css
│   │   └── ...
│   ├── reducers/     # Lógica de useReducer para gerenciamento de estado complexo
│   │   ├── plantaoReducer.js
│   │   └── pendenciaReducer.js
│   │   └── initialState.js # Estado inicial para os reducers
│   ├── App.jsx       # Componente principal da aplicação e rotas
│   ├── index.jsx     # Ponto de entrada da aplicação
│   └── index.css     # Estilos globais
├── .gitignore
├── package.json
├── README.md

## Considerações Específicas

### Gerenciamento de Estado com `useReducer`

Este projeto faz uso extensivo do `useReducer` para gerenciar o estado da aplicação de forma robusta e previsível. Os `reducers` e `initialState` são definidos em arquivos externos na pasta `reducers/` para encapsular a lógica de transição de estado, promovendo uma arquitetura limpa e de fácil manutenção. Essa abordagem é preferida para gerenciar estados mais complexos e com muitas transições.

### Exportações Nomeadas

Conforme a preferência de desenvolvimento, todas as exportações de componentes, funções e outras utilidades são realizadas utilizando **exportações nomeadas**. Isso contribui para uma melhor clareza no código, facilita o rastreamento das dependências e promove um padrão consistente de importação em todo o projeto.

### Persistência de Dados (Local ou Backend)

Atualmente, a persistência dos dados pode ser baseada no armazenamento local do navegador (localStorage/sessionStorage) ou pode estar preparada para uma futura integração com um backend (como Supabase, Firebase ou uma API customizada) para armazenamento persistente em nuvem. (Verifique o código para confirmar a estratégia atual de persistência).

## Contribuição

Contribuições são bem-vindas! Se você encontrar bugs, tiver sugestões de melhoria ou quiser adicionar novas funcionalidades, sinta-se à vontade para:

1.  Abrir uma [Issue](https://github.com/MarcioBADias/TI_gestor-plantao-pendencias/issues) descrevendo o problema ou a ideia.
2.  Criar um [Pull Request](https://github.com/MarcioBADias/TI_gestor-plantao-pendencias/pulls) com suas alterações.

## Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).

---
