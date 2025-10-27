import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const kc = inject(KeycloakService);

  // transforma a Promise do updateToken em um Observable
  return from(kc.updateToken(30)).pipe(
    switchMap(() => {
      const token = kc.token;
      const cloned = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(cloned);
    })
  );
};
