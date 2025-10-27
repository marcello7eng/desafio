export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081/api',
  keycloak: {
    url: 'http://localhost:8080',   // endereço do Keycloak no docker-compose
    realm: 'desafio-app',           // nome do seu realm
    clientId: 'desafio-frontend',   // nome do client no Keycloak
  },
};
