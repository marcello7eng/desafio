import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService, Usuario } from '../../core/services/usuario.service';

@Component({
  selector: 'app-professores-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h2>Lista de Professores</h2>
      <button (click)="novo()">Novo Professor</button>

      <table *ngIf="professores.length > 0; else vazio">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let professor of professores">
            <td>{{ professor.nome }}</td>
            <td>{{ professor.email }}</td>
            <td>{{ professor.matricula }}</td>
            <td>
             <button (click)="editar(professor.id!)">Editar</button>
              <button (click)="deletar(professor.id!)">Excluir</button>

            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #vazio>
        <p>Nenhum professor cadastrado.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 30px auto; display: flex; flex-direction: column; gap: 15px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f0f0f0; }
    button { margin-right: 5px; padding: 6px 10px; }
  `]
})
export class ProfessoresListComponent implements OnInit {
  professores: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.usuarioService.listByRole('professor').subscribe({
      next: (data) => this.professores = data,
      error: (err) => console.error('Erro ao carregar professores', err)
    });
  }

  novo() {
    this.router.navigate(['/professores/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/professores', id]);
  }

  deletar(id: string) {
    if (confirm('Deseja realmente excluir este professor?')) {
      this.usuarioService.delete(id).subscribe(() => {
        this.professores = this.professores.filter(p => p.id !== id);
      });
    }
  }
}
