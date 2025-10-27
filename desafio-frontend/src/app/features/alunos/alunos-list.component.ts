import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService, Usuario } from '../../core/services/usuario.service';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h2>Lista de Alunos</h2>
      <button (click)="novo()">Novo Aluno</button>

      <table *ngIf="alunos.length > 0; else vazio">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let aluno of alunos">
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.email }}</td>
            <td>{{ aluno.matricula }}</td>
            <td>
             <button (click)="editar(aluno.id!)">Editar</button>
              <button (click)="deletar(aluno.id!)">Excluir</button>

            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #vazio>
        <p>Nenhum aluno cadastrado.</p>
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
export class AlunosListComponent implements OnInit {
  alunos: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.usuarioService.listByRole('aluno').subscribe({
      next: (data) => this.alunos = data,
      error: (err) => console.error('Erro ao carregar alunos', err)
    });
  }

  novo() {
    this.router.navigate(['/alunos/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/alunos', id]);
  }

  deletar(id: string) {
    if (confirm('Deseja realmente excluir este aluno?')) {
      this.usuarioService.delete(id).subscribe(() => {
        this.alunos = this.alunos.filter(a => a.id !== id);
      });
    }
  }
}
