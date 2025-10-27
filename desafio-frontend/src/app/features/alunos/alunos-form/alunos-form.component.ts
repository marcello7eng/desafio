import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-alunos-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ id ? 'Editar Aluno' : 'Novo Aluno' }}</h2>

      <form (ngSubmit)="salvar()">
        <label>Nome:</label>
        <input [(ngModel)]="usuario.nome" name="nome" required />

        <label>Email:</label>
        <input [(ngModel)]="usuario.email" name="email" required type="email" />

        <label>CPF:</label>
        <input [(ngModel)]="usuario.cpf" name="cpf" required />

        <label>Matrícula:</label>
        <input [(ngModel)]="usuario.matricula" name="matricula" required />

        <div class="actions">
          <button type="submit">Salvar</button>
          <button type="button" (click)="voltar()">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 30px auto; display: flex; flex-direction: column; gap: 10px; }
    input { padding: 8px; width: 100%; box-sizing: border-box; }
    .actions { display: flex; gap: 10px; justify-content: flex-end; }
  `]
})
export class AlunosFormComponent implements OnInit {
  id: string | null = null;
  usuario: any = { nome: '', email: '', cpf: '', matricula: '', papel: 'aluno' };

  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.find(this.id).subscribe((data) => this.usuario = data);
    }
  }

  salvar() {
    if (this.id) {
      this.service.update(this.id, this.usuario).subscribe(() => this.voltar());
    } else {
      this.service.create(this.usuario).subscribe(() => this.voltar());
    }
  }

  voltar() {
    this.router.navigate(['/alunos']);
  }
}
