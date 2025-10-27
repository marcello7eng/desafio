# 📚 Sistema de Gestão Acadêmica

Este projeto implementa um **Sistema de Gestão Acadêmica** , seguindo uma arquitetura moderna com microserviços orquestrados via Docker Compose.
---

## 🏗️ Arquitetura do Projeto (Fullstack Monorepo)

O projeto é dividido em três componentes principais, todos isolados em suas respectivas pastas:

* **Backend** (`desafio-backend`): **Quarkus (Java)**. API RESTful segura, construída para alto desempenho e baixo consumo de memória.
* **Frontend** (`desafio-frontend`): **Angular 20+ (Standalone)**. Aplicação Web Single Page Application (SPA).
* **Infraestrutura**: **Docker Compose**. Gerenciamento de identidade (**Keycloak**) e banco de dados (**MySQL**).

---

## 🚀 Setup Rápido: Como Iniciar o Projeto

Este projeto foi desenhado para ser iniciado com **apenas um comando** (e alguns passos de configuração), automatizando a infraestrutura e o backend.

### Pré-requisitos 🛠️

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Docker & Docker Compose:** Essenciais para rodar o MySQL e o Keycloak.
* **Java JDK 17+:** Necessário para o framework Quarkus.
* **Maven (`mvn`):** Ferramenta de build do projeto Java.
* **Node.js 20+ & Angular CLI:** Para rodar o projeto Frontend.

### Passos de Execução (Ordem Recomendada)

Siga os passos na ordem para garantir a correta inicialização dos serviços:

#### 1. Subir a Infraestrutura (Keycloak e MySQL)

Na **pasta raiz do projeto** (`/desafio`), execute o Docker Compose. Isso iniciará o **MySQL** (porta `3306`) e o **Keycloak** (porta `8080`).

Configuração do Keycloak 
obs:📁 Estrutura esperada de pastas deve ser assim:
/desafio
├─ docker-compose.yml
├─ desafio-backend/
├─ desafio-frontend/
└─ keycloak/
   └─ realm-desafio-app.json

No terminal terminal bash na pasta desafio:
docker-compose up -d

===============================================Atenção===============================================================
O docker-compose.yml foi configurado para pegar as informações realm-desafio-app.json e assim já criar o nosso realm 
e as demais configurações dele.

2. Iniciar o Backend (Quarkus)
O Backend será iniciado e fará a conexão automática com o MySQL e o Keycloak.


# Navegue para a pasta do backend
cd desafio-backend

# Inicie o Quarkus no modo desenvolvimento

 terminal bash:
./mvnw quarkus:dev
⚠️ Aguarde o log mostrar Listening on: http://localhost:8081. O backend está rodando na porta 8081.

Configurar o Keycloak (Primeira Vez)
O Keycloak está rodando, mas você precisa configurar o Realm de segurança apenas na primeira execução.

Abra o navegador em: http://localhost:8080

Faça login no Realm Master (Usuário: admin, Senha: admin).

iniciar o Frontend (Angular)


# Navegue para a pasta do frontend
terminal bash:
cd desafio-frontend

# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
ng serve --port 4200
🎉 Aguarde o log mostrar Application bundle generation complete. O sistema estará acessível em http://localhost:4200.

✅ Uso da Aplicação e Segurança
O sistema está acessível em http://localhost:4200. Ao tentar acessar, você será redirecionado automaticamente para a tela de Login do Keycloak.

Edite e ligue (ON) a opção: Add to access token.
