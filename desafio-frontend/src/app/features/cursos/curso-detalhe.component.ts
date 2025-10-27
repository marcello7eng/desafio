import { Component, inject, OnInit } from '@angular/core';
import { CursoService, Curso, Disciplina } from '../../core/services/curso.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-curso-detalhe',
  imports: [
    NgFor, NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <h2>Matriz Curricular</h2>

    <div *ngIf="curso">
      <h3>{{ curso.nome }}</h3>
      <p><strong>Código:</strong> {{ curso.codigo }}</p>
      <p><strong>Duração:</strong> {{ curso.duracaoSemestres }} semestres</p>
    </div>

    <mat-card class="form-card">
      <h3>Adicionar Disciplina</h3>
      <form (ngSubmit)="salvarDisciplina()">
        <mat-form-field appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput [(ngModel)]="nova.nome" name="nome" required />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Código</mat-label>
          <input matInput [(ngModel)]="nova.codigo" name="codigo" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Carga Horária</mat-label>
          <input matInput type="number" [(ngModel)]="nova.cargaHoraria" name="cargaHoraria" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Semestre</mat-label>
          <input matInput type="number" [(ngModel)]="nova.semestre" name="semestre" />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">Adicionar</button>
      </form>
    </mat-card>

    <div class="grid">
      <mat-card class="semestre-card" *ngFor="let s of semestres">
        <h3>{{ s }}º Semestre</h3>
        <div *ngFor="let d of disciplinasPorSemestre(s)" class="disciplina">
          <mat-icon color="primary">book</mat-icon>
          <span *ngIf="!editando[d.id!]">{{ d.nome }} ({{ d.cargaHoraria }}h)</span>
          
          <!-- Edição inline -->
          <input *ngIf="editando[d.id!]" [(ngModel)]="d.nome" class="inline-edit" />

          <button mat-icon-button color="accent" (click)="alternarEdicao(d)">
            <mat-icon>{{ editando[d.id!] ? 'save' : 'edit' }}</mat-icon>
          </button>

          <button mat-icon-button color="warn" (click)="removerDisciplina(d.id!)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-card {
      margin-bottom: 16px;
      padding: 16px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }
    .semestre-card {
      padding: 12px;
    }
    .disciplina {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }
    .inline-edit {
      flex: 1;
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      font-size: 14px;
    }
  `]
})
export class CursoDetalheComponent implements OnInit {
  private api = inject(CursoService);
  private route = inject(ActivatedRoute);

  id!: string;
  curso?: Curso;
  nova: Disciplina = { nome: '', codigo: '', cargaHoraria: 0, semestre: 1 };
  editando: Record<string, boolean> = {};

  get semestres(): number[] {
    return this.curso?.disciplinas
      ? Array.from(new Set(this.curso.disciplinas.map(d => d.semestre))).sort((a, b) => a - b)
      : [];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.carregar();
  }

  carregar() {
    this.api.find(this.id).subscribe(c => this.curso = c);
  }

  disciplinasPorSemestre(s: number) {
    return this.curso?.disciplinas?.filter(d => d.semestre === s) ?? [];
  }

  salvarDisciplina() {
    if (!this.curso?.id) return;
    this.api.addDisciplina(this.curso.id, this.nova).subscribe(() => {
      this.nova = { nome: '', codigo: '', cargaHoraria: 0, semestre: 1 };
      this.carregar();
    });
  }

  alternarEdicao(d: Disciplina) {
    if (!this.curso?.id || !d.id) return;
    const editando = this.editando[d.id];
    if (editando) {
      this.api.updateDisciplina(this.curso.id, d.id, d).subscribe(() => this.carregar());
    }
    this.editando[d.id] = !editando;
  }

  removerDisciplina(id: string) {
    if (!this.curso?.id) return;
    if (confirm('Excluir disciplina?')) {
      this.api.deleteDisciplina(this.curso.id, id).subscribe(() => this.carregar());
    }
  }
}
