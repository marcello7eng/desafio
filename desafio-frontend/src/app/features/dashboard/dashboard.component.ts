import { Component, inject } from '@angular/core';
import { KeycloakService } from '../../core/auth/keycloak.service';
import { ROLES } from '../../core/auth/roles.util';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NgIf],
  template: `
    <h2>Bem-vindo(a), {{ kc.username }}</h2>

    <p *ngIf="kc.hasRole(roles.ADMIN)">
      Você é <strong>ADMIN</strong>: pode gerenciar usuários.
    </p>

    <p *ngIf="kc.hasAnyRole([roles.COORD, roles.ADMIN])">
      Você é <strong>COORDENADOR</strong>: pode gerenciar cursos e disciplinas.
    </p>

    <p *ngIf="kc.hasAnyRole([roles.PROF, roles.ALUNO])">
      Você é <strong>Professor ou Aluno</strong>: pode visualizar a matriz curricular.
    </p>
  `
})
export class DashboardComponent {
  kc = inject(KeycloakService);
  roles = ROLES;
}