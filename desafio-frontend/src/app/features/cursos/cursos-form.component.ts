import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService, Curso } from '../../core/services/curso.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: `
    <div class="container">
      <h2>{{ curso.id ? 'Editar Curso' : 'Novo Curso' }}</h2>

      <form (ngSubmit)="salvar()">
        <label>Nome:</label>
        <input [(ngModel)]="curso.nome" name="nome" required />

        <label>Código:</label>
        <input [(ngModel)]="curso.codigo" name="codigo" required />

        <label>Área:</label>
        <input [(ngModel)]="curso.area" name="area" />

        <label>Duração (semestres):</label>
        <input [(ngModel)]="curso.duracaoSemestres" name="duracaoSemestres" type="number" min="1" />

        <label>Descrição:</label>
        <textarea [(ngModel)]="curso.descricao" name="descricao"></textarea>

        <div class="botoes">
          <button mat-raised-button color="primary" type="submit">Salvar</button>
          <button mat-stroked-button type="button" (click)="voltar()">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 30px auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    form { display: flex; flex-direction: column; gap: 10px; }
    input, textarea { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
    .botoes { display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px; }
  `]
})
export class CursosFormComponent implements OnInit {
  private api = inject(CursoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  curso: Curso = { nome: '', codigo: '', descricao: '', area: '', duracaoSemestres: 1 };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.find(id).subscribe((data) => (this.curso = data));
    }
  }

  salvar() {
    if (this.curso.id) {
      this.api.update(this.curso.id, this.curso).subscribe(() => this.voltar());
    } else {
      this.api.create(this.curso).subscribe(() => this.voltar());
    }
  }

  voltar() {
    this.router.navigate(['/cursos']);
  }
}
