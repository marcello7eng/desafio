📚 Sistema de Gestão Acadêmica (Quarkus + Angular + Keycloak + MySQL)

Este projeto implementa um sistema de gestão académica web, seguindo o padrão de arquitetura moderna (Fullstack Monorepo) com microserviços em Docker Compose.

O projeto é dividido em três componentes principais:

Backend (desafio-backend): API RESTful segura construída com Java e o framework Quarkus.

Frontend (desafio-frontend): Aplicação web SPA construída com Angular 20+ (Standalone).

Infraestrutura: Gerenciamento de identidade (Keycloak) e banco de dados (MySQL) via Docker Compose.

🚀 Como Iniciar o Projeto (Setup Rápido)

Este projeto foi desenhado para ser iniciado com apenas um comando, automatizando a infraestrutura e o backend.

Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

Docker & Docker Compose: Essenciais para rodar o banco de dados e o Keycloak.

Java JDK 17+: Necessário para o Quarkus.

Maven (mvn): Ferramenta de build do projeto Java.

Node.js 20+ & Angular CLI: Para rodar o projeto Frontend.

Passos de Execução

Siga os passos na ordem para garantir a correta inicialização da infraestrutura e do backend.

1. Subir a Infraestrutura (Keycloak e MySQL)

Na pasta raiz do projeto (/desafio), execute o Docker Compose. Isso iniciará o MySQL (porta 3306) e o Keycloak (porta 8080).

docker-compose up -d



2. Iniciar o Backend (Quarkus)

O Backend se conectará ao MySQL e ao Keycloak (na porta 8080) e criará todas as tabelas e endpoints seguros.

Navegue até a pasta do backend:

cd desafio-backend
./mvnw quarkus:dev



Aguarde o log mostrar Listening on: http://localhost:8081. O backend está rodando.

3. Configurar o Keycloak (Inicialização)

O Keycloak está rodando, mas o Realm de segurança não existe. Você deve configurá-lo uma única vez:

Abra o navegador em: http://localhost:8080

Faça login no Realm Master (Usuário: admin, Senha: admin).

Recrie o Realm e os Usuários (explicado em detalhes na seção Configuração do Keycloak).

4. Iniciar o Frontend (Angular)

Navegue para a pasta do frontend e inicie o servidor de desenvolvimento:

cd ../desafio-frontend
npm install           # Instala as dependências do Node
ng serve --port 4200



Aguarde o log mostrar Application bundle generation complete.

✅ Uso da Aplicação e Políticas de Segurança (Back-end)

O sistema está acessível em http://localhost:4200.

Fluxo de Acesso

Ao acessar http://localhost:4200, você será automaticamente redirecionado para a tela de Login do Keycloak.

Faça login com um dos usuários criados (ex: admin-teste, professor-teste).

Rotas e Políticas de Segurança (Back-end)

|

| Endpoint | Método | Descrição | Permissões Requeridas |
| /api/usuarios | CRUD | Gerenciamento de perfis de usuário. | admin |
| /api/cursos | GET/POST/PUT/DELETE | Gerenciamento completo de cursos. | admin, coordenador |
| /api/cursos/{id} | GET | Visualização da Matriz Curricular. | admin, coordenador, professor, aluno |
| /api/cursos/{cId}/disciplinas | POST | Adicionar Disciplina à Matriz Curricular. | admin, coordenador |
| /api/cursos/{cId}/disciplinas/{dId} | PUT/DELETE | Atualizar/Remover Disciplina da Matriz. | admin, coordenador |

🔑 Configuração do Keycloak (Passo 3 Detalhado)

Se esta for a primeira vez que você inicia o projeto, você deve recriar o Realm desafio-app manualmente.

1. Criar o Realm

No Keycloak (logado como admin), clique em Add Realm e crie um novo chamado desafio-app.

2. Criar Roles (Funções)

Navegue para Realm Roles (dentro do desafio-app) e crie as seguintes funções:

admin

coordenador

professor

aluno

3. Criar o Cliente Frontend

Navegue para Clients e clique em Create:

Client ID: desafio-frontend

Root URL: http://localhost:4200

Valid Redirect URIs: http://localhost:4200/*

Web Origins: http://localhost:4200

Configuração Adicional: Na aba Settings, ligue o Direct Access Grants.

Mapeador de Roles: Este é o ponto crucial para o JWT.

Navegue até Client Scopes (menu principal) -> roles (clique no escopo).

Aba Mappers -> Encontre o mapeador realm roles.

Edite e ligue (ON) a opção: Add to access token.

4. Criar Usuários de Teste

Crie os usuários de teste, atribuindo a senha 123456 e o respectivo Role mapping (Mapeamento de Funções):

| Usuário | Senha | Role Mapping | Uso |
| admin-teste | 123456 | admin | CRUD de Usuários |
| coordenador-teste | 123456 | coordenador | CRUD de Cursos e Disciplinas |
| professor-teste | 123456 | professor | Visualização da Matriz |
| aluno-teste | 123456 | aluno | Visualização da Matriz |

🛠️ Detalhes da Configuração

Backend (desafio-backend)

Framework: Quarkus 3.x

Persistência: Hibernate ORM + Panache (Active Record)

Banco: MySQL 8.0

Segurança: SmallRye JWT (Leitura de tokens do Keycloak)

Porta: 8081

Frontend (desafio-frontend)

Framework: Angular 20+ (Standalone)

Estilo: SCSS

Segurança: keycloak-angular (Inicialização via APP_INITIALIZER e Interceptor de requisições).

Porta: 4200

Estrutura de Rotas (Angular)

| Rota | Tipo de Acesso | Componente (a ser criado) |
| / | Redirecionamento | (Componente de Boas-vindas) |
| /cursos | Todos os Logados | CursosComponent |
| /usuarios | Apenas Admin | UsuariosComponent |
| /matricula | Apenas Coordenador | MatrizComponent |
