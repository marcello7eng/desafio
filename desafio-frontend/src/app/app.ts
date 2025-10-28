import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { KeycloakService } from './core/auth/keycloak.service';
import { ROLES } from './core/auth/roles.util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="layout">
      <mat-sidenav #drawer mode="side" [opened]="true" class="sidenav">
        <h3 class="logo">🎓 Desafio</h3>

        <mat-nav-list>
          <!-- DASHBOARD -->
          <a mat-list-item routerLink="/" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon><span>Dashboard</span>
          </a>

          <!-- USUÁRIOS (somente ADMIN) -->
          <a *ngIf="kc.hasRole(roles.ADMIN)"
             mat-list-item
             routerLink="/usuarios"
             routerLinkActive="active">
            <mat-icon>group</mat-icon><span>Usuários</span>
          </a>

          <!-- CURSOS (ADMIN e COORDENADOR) -->
          <a *ngIf="kc.hasAnyRole([roles.ADMIN, roles.COORD])"
             mat-list-item
             routerLink="/cursos"
             routerLinkActive="active">
            <mat-icon>library_books</mat-icon><span>Cursos</span>
          </a>

          <!-- MATRIZ CURRICULAR (todos os papéis) -->
          <a *ngIf="kc.hasAnyRole([roles.PROF, roles.ALUNO, roles.COORD, roles.ADMIN])"
             mat-list-item
             routerLink="/matriz"
             routerLinkActive="active">
            <mat-icon>grid_view</mat-icon><span>Matriz Curricular</span>
          </a>

          <!-- PROFESSORES (ADMIN e COORDENADOR) -->
          <a *ngIf="kc.hasAnyRole([roles.ADMIN, roles.COORD])"
             mat-list-item
             routerLink="/professores"
             routerLinkActive="active">
            <mat-icon>person</mat-icon><span>Professores</span>
          </a>

          <!-- ALUNOS (ADMIN e COORDENADOR) -->
          <a *ngIf="kc.hasAnyRole([roles.ADMIN, roles.COORD])"
             mat-list-item
             routerLink="/alunos"
             routerLinkActive="active">
            <mat-icon>school</mat-icon><span>Alunos</span>
          </a>
        </mat-nav-list>

        <!-- BOTÃO SAIR -->
        <div class="bottom-menu">
          <button mat-button color="warn" (click)="kc.logout()">
            <mat-icon>logout</mat-icon> Sair
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <button mat-icon-button (click)="drawer.toggle()" class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="title">Desafio Frontend</span>
          <span class="spacer"></span>
          <span *ngIf="kc.username">Olá, {{ kc.username }}</span>
        </mat-toolbar>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .layout { height: 100vh; }
    .sidenav {
      width: 240px;
      background: #e0f2f1;
      border-right: 1px solid #c8e6c9;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .logo {
      margin: 16px;
      color: #00695c;
      text-align: center;
    }
    .menu-button {
      display: none;
    }
    .content {
      padding: 16px;
    }
    .spacer { flex: 1 1 auto; }
    .bottom-menu {
      padding: 8px;
      border-top: 1px solid #b2dfdb;
    }
    a.active { background: rgba(0,0,0,0.08); }
    @media (max-width: 768px) {
      .menu-button { display: inline-flex; }
      mat-sidenav { width: 200px; }
    }
  `]
})
export class App {
  kc = inject(KeycloakService);
  roles = ROLES;
}
