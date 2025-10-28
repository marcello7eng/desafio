import { Component, inject, OnInit } from '@angular/core';
import { CursoService, Curso } from '../../core/services/curso.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { KeycloakService } from '../../core/auth/keycloak.service';

@Component({
  standalone: true,
  selector: 'app-cursos-list',
  imports: [NgFor, NgIf, RouterLink, MatTableModule, MatButtonModule],
  template: `
    <h2>Cursos</h2>

    <!-- Informação de depuração -->
    <p style="color: gray; font-size: 13px;">
      Usuário: {{ kc.username }} <br>
      Roles: {{ kc['kc']?.tokenParsed?.realm_access?.roles }}
    </p>

    <!-- Exibe o botão Novo Curso somente para admin e coordenador -->
    <a *ngIf="isCoordenadorOuAdmin"
       mat-raised-button color="primary"
       routerLink="/cursos/novo">
      Novo Curso
    </a>

    <table mat-table [dataSource]="cursos" class="mat-elevation-z2">
      <ng-container matColumnDef="nome">
        <th mat-header-cell *matHeaderCellDef>Nome</th>
        <td mat-cell *matCellDef="let c">{{ c.nome }}</td>
      </ng-container>

      <ng-container matColumnDef="codigo">
        <th mat-header-cell *matHeaderCellDef>Código</th>
        <td mat-cell *matCellDef="let c">{{ c.codigo }}</td>
      </ng-container>

      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef>Ações</th>
        <td mat-cell *matCellDef="let c">
          <!-- Editar e Montar Matriz: admin ou coordenador -->
          <a *ngIf="kc.hasAnyRole(['admin','coordenador'])"
             mat-button color="primary"
             [routerLink]="['/cursos', c.id]">
            Editar
          </a>

          <a *ngIf="kc.hasAnyRole(['admin','coordenador'])"
             mat-button color="accent"
             [routerLink]="['/cursos', c.id, 'matriz']">
            Montar Matriz
          </a>

          <!-- Professores e alunos: apenas visualizar -->
          <a *ngIf="kc.hasAnyRole(['professor','aluno'])"
             mat-button color="accent"
             [routerLink]="['/cursos', c.id, 'matriz']">
            Ver Matriz
          </a>

          <button *ngIf="kc.hasAnyRole(['admin','coordenador'])"
                  mat-button color="warn"
                  (click)="remover(c.id!)">
            Excluir
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols"></tr>
    </table>
  `,
  styles: [`
    table { width: 100%; margin-top: 16px; }
    h2 { margin-bottom: 10px; }
    a[mat-raised-button] { margin-bottom: 12px; display: inline-block; }
  `],
})
export class CursosListComponent implements OnInit {
  private api = inject(CursoService);
  private router = inject(Router);
  kc = inject(KeycloakService);

  cursos: Curso[] = [];
  cols = ['nome', 'codigo', 'acoes'];
  isCoordenadorOuAdmin = false; // controle local de exibição

  ngOnInit() {
    console.log('Token decodificado:', (this.kc as any)['kc']?.tokenParsed);

    // aguarda o carregamento completo do Keycloak antes de verificar roles
    setTimeout(() => {
      const roles = (this.kc as any)['kc']?.tokenParsed?.realm_access?.roles || [];
      console.log('Roles detectadas:', roles);
      this.isCoordenadorOuAdmin = this.kc.hasAnyRole(['admin', 'coordenador']);
      console.log('É coordenador/admin?', this.isCoordenadorOuAdmin);
    }, 500);

    this.carregar();
  }

  carregar() {
    this.api.list().subscribe({
      next: (data) => (this.cursos = data),
      error: (err) => console.error('Erro ao carregar cursos', err),
    });
  }

  remover(id: string) {
    if (confirm('Excluir este curso?')) {
      this.api.delete(id).subscribe(() => this.carregar());
    }
  }
}
