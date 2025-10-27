import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from './keycloak.service';

export function roleGuard(rolesPermitidos: string[]): CanActivateFn {
  return () => {
    const kc = inject(KeycloakService);
    const router = inject(Router);

    if (kc.hasAnyRole(rolesPermitidos)) {
      return true;
    }

    // se o usuário não tiver permissão, volta pra home
    router.navigateByUrl('/');
    return false;
  };
}
