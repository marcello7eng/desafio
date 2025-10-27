import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../core/services/usuario.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-usuarios-list',
  imports: [
    NgFor,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2>Gestão de Usuários (ADMIN)</h2>

    <div class="novo">
      <h3>Novo Usuário</h3>
      <form (ngSubmit)="criarUsuario()">
        <mat-form-field appearance="fill">
          <mat-label>Nome</mat-label>
          <input matInput [(ngModel)]="novo.nome" name="nome" required />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="novo.email" name="email" required />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Papel</mat-label>
          <input matInput [(ngModel)]="novo.papel" name="papel" required />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">
          Adicionar
        </button>
      </form>
    </div>

    <table mat-table [dataSource]="usuarios" class="mat-elevation-z2">
      <ng-container matColumnDef="nome">
        <th mat-header-cell *matHeaderCellDef>Nome</th>
        <td mat-cell *matCellDef="let u">{{ u.nome }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let u">{{ u.email }}</td>
      </ng-container>

      <ng-container matColumnDef="papel">
        <th mat-header-cell *matHeaderCellDef>Papel</th>
        <td mat-cell *matCellDef="let u">{{ u.papel }}</td>
      </ng-container>

      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef>Ações</th>
        <td mat-cell *matCellDef="let u">
          <button mat-button color="warn" (click)="excluirUsuario(u.id!)">
            Excluir
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols"></tr>
    </table>
  `,
  styles: [
    `
      .novo {
        margin-bottom: 16px;
      }
      table {
        width: 100%;
      }
      mat-form-field {
        width: 200px;
        margin-right: 8px;
      }
    `,
  ],
})
export class UsuariosListComponent implements OnInit {
  private api = inject(UsuarioService);
  usuarios: Usuario[] = [];
  cols = ['nome', 'email', 'papel', 'acoes'];
  novo: Usuario = { nome: '', email: '', papel: 'aluno' };

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.list().subscribe((d) => (this.usuarios = d));
  }

  criarUsuario() {
    if (!this.novo.nome || !this.novo.email || !this.novo.papel) return;
    this.api.create(this.novo).subscribe(() => {
      this.novo = { nome: '', email: '', papel: 'aluno' };
      this.load();
    });
  }

  excluirUsuario(id: string) {
    if (confirm('Excluir este usuário?')) {
      this.api.delete(id).subscribe(() => this.load());
    }
  }
}
