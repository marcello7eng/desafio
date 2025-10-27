import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Disciplina {
  id?: string;
  nome: string;
  codigo?: string;
  cargaHoraria?: number;
  semestre: number;
}

export interface Curso {
  id?: string;
  nome: string;
  area?: string;
  duracaoSemestres?: number;
  codigo?: string;
  descricao?: string;
  disciplinas?: Disciplina[];
}

@Injectable({ providedIn: 'root' })
export class CursoService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/cursos`;

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.base);
  }

  find(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.base}/${id}`);
  }

  create(c: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.base, c);
  }

  update(id: string, c: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.base}/${id}`, c);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // --- Disciplinas ---
  addDisciplina(cursoId: string, d: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(`${this.base}/${cursoId}/disciplinas`, d);
  }

  updateDisciplina(cursoId: string, discId: string, d: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.base}/${cursoId}/disciplinas/${discId}`, d);
  }

  deleteDisciplina(cursoId: string, discId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${cursoId}/disciplinas/${discId}`);
  }
}
