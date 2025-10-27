import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../core/services/curso.service';
import { KeycloakService } from '../../core/auth/keycloak.service';
import { ROLES } from '../../core/auth/roles.util';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-matriz-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule],
  template: `
    <div class="container">
      <h2>Matriz Curricular</h2>

      <div *ngFor="let curso of cursos" class="curso-card">
        <mat-card>
          <mat-card-title>
            <mat-icon>school</mat-icon> {{ curso.nome }}
          </mat-card-title>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div *ngIf="curso.disciplinas?.length > 0; else semDisciplina">
              <div *ngFor="let semestre of getSemestres(curso)" class="semestre-section">
                <h4>Semestre {{ semestre }}</h4>
                <ul>
                  <li *ngFor="let d of filtrarDisciplinas(curso, semestre)">
                    {{ d.nome }} — {{ d.cargaHoraria }}h

                    <!-- Botão de exclusão: apenas admin e coordenador -->
                    <button
                      *ngIf="kc.hasAnyRole(['admin','coordenador'])"
                      mat-icon-button
                      color="warn"
                      (click)="removerDisciplina(curso.id, d.id)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </li>
                </ul>

                <!-- Botão de adicionar disciplina -->
                <button
                  *ngIf="kc.hasAnyRole(['admin','coordenador'])"
                  mat-stroked-button
                  color="primary"
                  (click)="adicionarDisciplina(curso.id, semestre)">
                  Adicionar Disciplina
                </button>
              </div>
            </div>

            <ng-template #semDisciplina>
              <p class="vazio">Nenhuma disciplina cadastrada.</p>
              <button
                *ngIf="kc.hasAnyRole(['admin','coordenador'])"
                mat-raised-button
                color="primary"
                (click)="adicionarDisciplina(curso.id, 1)">
                Criar Primeira Disciplina
              </button>
            </ng-template>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 16px;
      max-width: 900px;
      margin: auto;
    }
    .curso-card { margin-bottom: 24px; }
    mat-card { background: #f9f9f9; }
    h2 { text-align: center; color: #00796b; margin-bottom: 24px; }
    h4 { margin-top: 12px; color: #004d40; }
    ul { list-style: none; padding: 0; }
    li { padding: 4px 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: space-between; }
    button { margin-top: 8px; }
    .vazio { color: #757575; font-style: italic; }
  `],
})
export class MatrizViewComponent implements OnInit {
  cursos: any[] = [];
  roles = ROLES;

  constructor(
    private cursoService: CursoService,
    public kc: KeycloakService
  ) {}

  ngOnInit() {
  this.cursoService.list().subscribe({
    next: (dados) => {
      console.log('Cursos recebidos:', dados);
      this.cursos = dados;
    },
    error: (err) => console.error('Erro ao carregar cursos', err),
  });
}


  getSemestres(curso: any): number[] {
    const semestres = (curso.disciplinas || []).map((d: any) => d.semestre);
    return Array.from(new Set<number>(semestres)).sort((a, b) => a - b);
  }

  filtrarDisciplinas(curso: any, semestre: number) {
    return curso.disciplinas?.filter((d: any) => d.semestre === semestre) || [];
  }

  adicionarDisciplina(cursoId: string, semestre: number) {
    const nome = prompt('Nome da disciplina:');
    const codigo = prompt('Código:');
    const cargaHoraria = Number(prompt('Carga horária:'));
    if (!nome || !codigo) return;

    const nova = { nome, codigo, cargaHoraria, semestre };
    this.cursoService.addDisciplina(cursoId, nova).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Erro ao adicionar disciplina', err),
    });
  }

  removerDisciplina(cursoId: string, disciplinaId: string) {
    if (confirm('Excluir esta disciplina?')) {
      this.cursoService.deleteDisciplina(cursoId, disciplinaId).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.error('Erro ao excluir disciplina', err),
      });
    }
  }
}
