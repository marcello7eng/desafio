# 📚 Sistema de Gestão Acadêmica

Este projeto implementa um **Sistema de Gestão Acadêmica** completo, seguindo uma arquitetura moderna com microserviços orquestrados via Docker Compose.

Desenvolvido para ser um sistema robusto e seguro, com foco em uma experiência de desenvolvimento simplificada.

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

```bash
docker-compose up -d

2. Iniciar o Backend (Quarkus)
O Backend será iniciado e fará a conexão automática com o MySQL e o Keycloak.


# Navegue para a pasta do backend
cd desafio-backend

# Inicie o Quarkus no modo desenvolvimento
./mvnw quarkus:dev
⚠️ Aguarde o log mostrar Listening on: http://localhost:8081. O backend está rodando na porta 8081.

Configurar o Keycloak (Primeira Vez)
O Keycloak está rodando, mas você precisa configurar o Realm de segurança apenas na primeira execução.

Abra o navegador em: http://localhost:8080

Faça login no Realm Master (Usuário: admin, Senha: admin).

Siga o guia detalhado na seção 🔑 Configuração do Keycloak abaixo para criar o Realm, Roles, Cliente e Usuários de Teste.

iniciar o Frontend (Angular)


# Navegue para a pasta do frontend
cd ../desafio-frontend

# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
ng serve --port 4200
🎉 Aguarde o log mostrar Application bundle generation complete. O sistema estará acessível em http://localhost:4200.

✅ Uso da Aplicação e Segurança
O sistema está acessível em http://localhost:4200. Ao tentar acessar, você será redirecionado automaticamente para a tela de Login do Keycloak.


Configuração do Keycloak (Passo 3 Detalhado)
Se esta for a primeira inicialização, siga estes passos dentro do Keycloak (logado como admin):

1. Criar o Realm
Clique em Add Realm e crie um novo chamado desafio-app.

2. Criar Roles (Funções)
No Realm desafio-app, navegue para Realm Roles e crie as seguintes funções:

admin

coordenador

professor

aluno

3. Criar o Cliente Frontend
Navegue para Clients e clique em Create com as seguintes configurações:

Client ID: desafio-frontend

Root URL: http://localhost:4200

Valid Redirect URIs: http://localhost:4200/*

Web Origins: http://localhost:4200

Configuração Adicional: Na aba Settings, ligue a opção Direct Access Grants.

4. Mapear Roles no JWT (Crucial!)
Este passo garante que as funções (Roles) do usuário sejam incluídas no token JWT, permitindo que o Backend as leia.

Navegue para Client Scopes (menu principal) -> roles (clique no escopo).

Aba Mappers -> Encontre o mapeador realm roles.

Edite e ligue (ON) a opção: Add to access token.
