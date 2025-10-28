import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-professores-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ id ? 'Editar Professor' : 'Novo Professor' }}</h2>

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
export class ProfessoresFormComponent implements OnInit {
  id: string | null = null;
  usuario: any = { nome: '', email: '', cpf: '', matricula: '', papel: 'professor' };

  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.find(this.id).subscribe({
        next: (data) => this.usuario = data,
        error: (err) => console.error('Erro ao carregar professor:', err)
      });
    }
  }

 salvar() {
  this.usuario.cpf = this.usuario.cpf?.replace(/\D/g, ''); // remove pontos e traços
  console.log('Salvando usuário:', this.usuario);

  if (this.id) {
    this.service.update(this.id, this.usuario).subscribe({
      next: () => this.voltar(),
      error: (err) => console.error('Erro ao atualizar professor:', err),
    });
  } else {
    this.service.create(this.usuario).subscribe({
      next: () => this.voltar(),
      error: (err) => console.error('Erro ao criar professor:', err),
    });
  }
}


  voltar() {
    this.router.navigate(['/professores']);
  }
}
