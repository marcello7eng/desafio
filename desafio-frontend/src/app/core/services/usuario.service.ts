import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.base);
  }

  find(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base}/${id}`);
  }

  create(u: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.base, u);
  }

  update(id: string, u: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.base}/${id}`, u);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

listByRole(papel: string): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.base}?papel=${papel}`);
}

}