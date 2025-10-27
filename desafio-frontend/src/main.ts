import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { KeycloakService } from './app/core/auth/keycloak.service';
import { authInterceptor } from './app/core/http/auth.interceptor';

(async () => {
  const keycloak = new KeycloakService();
  await keycloak.init();

  await bootstrapApplication(App, {
    providers: [
      ...appConfig.providers,
      provideHttpClient(withInterceptors([authInterceptor])),
      { provide: KeycloakService, useValue: keycloak },
    ],
  });
})();
