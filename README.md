# 📚 Sistema de Gestão Acadêmica

Este projeto implementa um **Sistema de Gestão Acadêmica Web**, seguindo uma arquitetura moderna baseada em **microserviços orquestrados via Docker Compose**.

---

## 🏗️ Arquitetura do Projeto (Fullstack Monorepo)

O projeto é composto por três componentes principais:

| Componente | Descrição |
|-------------|------------|
| **Backend** (`desafio-backend`) | API RESTful segura desenvolvida em **Quarkus (Java)**, projetada para alto desempenho e baixo consumo de memória. |
| **Frontend** (`desafio-frontend`) | Aplicação **Angular 20+ (Standalone)** do tipo SPA (Single Page Application). |
| **Infraestrutura** | Gerenciamento de serviços via **Docker Compose**, incluindo o **Keycloak** (autenticação) e **MySQL** (banco de dados). |

---

## 🚀 Setup Rápido — Como Iniciar o Projeto

Este projeto foi desenhado para ser iniciado com **apenas um comando**, automatizando toda a infraestrutura.

---

### 🧩 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- 🐋 **Docker & Docker Compose** — Essenciais para rodar o MySQL e o Keycloak.
- ☕ **Java JDK 17+** — Necessário para executar o Quarkus.
- 🧱 **Maven (`mvn`)** — Ferramenta de build para o backend.
- 🟩 **Node.js 20+ & Angular CLI** — Para rodar o frontend.

---

## ⚙️ Passos de Execução (Ordem Recomendada)

Siga as etapas abaixo na **ordem indicada** para evitar conflitos entre serviços.

---

### **1️⃣ Subir a Infraestrutura (Keycloak e MySQL)**

Certifique-se de que sua estrutura de pastas esteja assim:

/desafio

├─ docker-compose.yml

├─ desafio-backend/

├─ desafio-frontend/

└─ keycloak/

   └─ realm-desafio-app.json


O arquivo `realm-desafio-app.json` já contém todas as configurações do **Realm**, **Roles**, **Clientes** e **Usuários de teste** do Keycloak.

> ⚠️ **Atenção:** O `docker-compose.yml` foi configurado para importar automaticamente esse arquivo e criar o realm completo na primeira execução.

No terminal (dentro da pasta `desafio`):

```bash
docker compose up -d

======================
Isso iniciará:

🗄️ MySQL → Porta 3306

🔑 Keycloak → Porta 8080

🧭 Adminer (visualizador do banco) → Porta 8088

=======================
Após alguns segundos, verifique se tudo subiu corretamente:
docker ps

=======================

2️⃣ Iniciar o Backend (Quarkus)

ATENÇÃO!!!!!!  ESSE PROJETO BACKEND FOI FEITO E ORGANIZADO NO VISUAL STUDIO,
OU SEJA SE VC FOR USAR NO ECLIPSE POR EXEMPLO DEVE CRIAR UMA CLASSE DE INICIALIZAÇÃO COMO SE FAZ NO SPRING

O backend faz a conexão automática com o MySQL e Keycloak.

Navegue até a pasta do backend: cd desafio-backend

Inicie o Quarkus em modo de desenvolvimento: ./mvnw quarkus:dev

Aguarde até o log exibir: Listening on: http://localhost:8081

✅ O backend estará disponível na porta 8081.

3️⃣ Configurar o Keycloak

http://localhost:8080

Usuário: admin
Senha : admin

( Caso não funcione acesse : http://localhost:8080/admin/master/console )

Após logar você verá o Realm desafio-app importado automaticamente.

Se quiser confirmar:

Clique no seletor de realms (canto superior esquerdo).

Selecione desafio-app.

Verifique:

Roles: admin, coordenador, professor, aluno

Clients: desafio-frontend

Usuários: admin-teste, professor-teste, aluno-teste etc.

4️⃣ Iniciar o Frontend (Angular)
Navegue até a pasta do frontend:

cd desafio-frontend

Instale as dependências do Node:

npm install

Inicie o servidor de desenvolvimento:

ng serve --port 4200


🎉 O sistema estará acessível em:
👉 http://localhost:4200

✅ Uso da Aplicação e Segurança

Ao acessar o sistema, o usuário será redirecionado automaticamente para o Keycloak (login).
Após autenticar, o token JWT retornará com os roles definidos no Realm (admin, coordenador, professor, aluno).

🔄 Logs e Diagnóstico

Para acompanhar os logs de todos os serviços:

docker compose logs -f


Ou apenas do Keycloak:

docker compose logs -f keycloak

🧑‍💻 Autor: Marcello Felipe
📦 Tecnologias: Quarkus • Angular • Keycloak • MySQL • Docker
