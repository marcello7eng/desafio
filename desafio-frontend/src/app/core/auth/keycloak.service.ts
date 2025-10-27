import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private kc!: KeycloakInstance;

  async init(): Promise<void> {
    this.kc = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });

    await this.kc.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256',
      flow: 'standard',
    });
  }

  get token(): string | undefined {
    return this.kc?.token;
  }

  get username(): string | undefined {
  return (this.kc?.tokenParsed as any)?.['preferred_username'] as string | undefined;

  }


  hasRole(role: string): boolean {
    const roles = (this.kc?.tokenParsed as any)?.realm_access?.roles || [];
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((r) => this.hasRole(r));
  }

  async updateToken(minValidity = 30): Promise<void> {
    if (!this.kc) return;
    await this.kc.updateToken(minValidity).catch(() => this.login());
  }

  login(): void {
    this.kc.login();
  }

  logout(): void {
    this.kc.logout({ redirectUri: window.location.origin });
  }
}