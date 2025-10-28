import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  cpf?: string;
  matricula?: string;
  papel: 'admin' | 'coordenador' | 'professor' | 'aluno';
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/usuarios`;
  baseUrl: any;
  getById: any;

  // --- Listar todos ---
  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.base);
  }

  // --- Buscar por ID ---
  find(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base}/${id}`);
  }

  // --- Criar novo usuário ---
  create(u: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.base, u).pipe(
      catchError((error) => {
        const message =
          error.error?.message || error.error || 'Erro ao criar usuário.';
        if (message.includes('já cadastrado')) {
          alert(message);
        } else {
          alert('CPF, Matrícula ou Email já cadastrado.');
        }
        return throwError(() => error);
      })
    );
  }

  // --- Atualizar ---
  update(id: string, u: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.base}/${id}`, u).pipe(
      catchError((error) => {
        const message =
          error.error?.message || error.error || 'Erro ao atualizar usuário.';
        if (message.includes('já cadastrado')) {
          alert(message);
        } else {
          alert('Erro inesperado ao atualizar usuário.');
        }
        return throwError(() => error);
      })
    );
  }

  // --- Deletar ---
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // --- Listar por papel ---
  listByRole(papel: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.base}?papel=${papel}`);
  }
}
