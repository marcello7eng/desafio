import { Routes } from '@angular/router';

// === Importação dos componentes ===
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list.component';
import { ProfessoresListComponent } from './features/professores/professores-list.component';
import { AlunosListComponent } from './features/alunos/alunos-list.component';
import { ProfessoresFormComponent } from './features/professores/professores-form/professores-form.component';
import { AlunosFormComponent } from './features/alunos/alunos-form/alunos-form.component';
import { CursosListComponent } from './features/cursos/cursos-list.component';
import { CursosFormComponent } from './features/cursos/cursos-form.component';
import { CursoDetalheComponent } from './features/cursos/curso-detalhe.component';
import { MatrizViewComponent } from './features/matriz/matriz-view.component';

// === Autenticação e controle de acesso ===
import { roleGuard } from './core/auth/auth.guard';
import { ROLES } from './core/auth/roles.util';

// === Definição de todas as rotas ===
export const routes: Routes = [
  // Página inicial
  { path: '', component: DashboardComponent },

  // =====================================
  // USUÁRIOS (somente ADMIN)
  // =====================================
  {
    path: 'usuarios',
    component: UsuariosListComponent,
    canActivate: [roleGuard([ROLES.ADMIN])],
  },

  // =====================================
  // CURSOS
  // =====================================
  {
    path: 'cursos',
    children: [
      // Listagem de cursos (somente ADMIN e COORDENADOR)
      {
        path: '',
        component: CursosListComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      // Cadastro de novo curso
      {
        path: 'novo',
        component: CursosFormComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      // Edição de curso existente
      {
        path: ':id',
        component: CursosFormComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      // Montagem / visualização da matriz curricular
      {
        path: ':id/matriz',
        component: CursoDetalheComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD, ROLES.PROF, ROLES.ALUNO])],
      },
    ],
  },

  // =====================================
  // MATRIZ CURRICULAR (somente visualização)
  // =====================================
  {
    path: 'matriz',
    component: MatrizViewComponent,
    canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD, ROLES.PROF, ROLES.ALUNO])],
  },

  // =====================================
  // PROFESSORES
  // =====================================
  {
    path: 'professores',
    children: [
      {
        path: '',
        component: ProfessoresListComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      {
        path: 'novo',
        component: ProfessoresFormComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      {
        path: ':id',
        component: ProfessoresFormComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
    ],
  },

  // =====================================
  // ALUNOS
  // =====================================
  {
    path: 'alunos',
    children: [
      {
        path: '',
        component: AlunosListComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      {
        path: 'novo',
        component: AlunosFormComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
      {
        path: ':id',
        component: AlunosFormComponent,
        canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
      },
    ],
  },

  // =====================================
  // ROTA CORINGA (fallback)
  // =====================================
  { path: '**', redirectTo: '' },
];
