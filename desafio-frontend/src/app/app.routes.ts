import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list.component';
import { ProfessoresListComponent } from './features/professores/professores-list.component';
import { AlunosListComponent } from './features/alunos/alunos-list.component'
import { ProfessoresFormComponent } from './features/professores/professores-form/professores-form.component';
import { AlunosFormComponent } from './features/alunos/alunos-form/alunos-form.component';
import { CursosListComponent } from './features/cursos/cursos-list.component';
import { CursosFormComponent } from './features/cursos/cursos-form.component';
import { CursoDetalheComponent } from './features/cursos/curso-detalhe.component';
import { MatrizViewComponent } from './features/matriz/matriz-view.component';
import { roleGuard } from './core/auth/auth.guard';
import { ROLES } from './core/auth/roles.util';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'usuarios',
    canActivate: [roleGuard([ROLES.ADMIN])],
    component: UsuariosListComponent,
  },
  {
    path: 'cursos',
    canActivate: [roleGuard([ROLES.COORD, ROLES.ADMIN])],
    children: [
      { path: '', component: CursosListComponent },
      { path: 'novo', component: CursosFormComponent },
      { path: ':id', component: CursosFormComponent },
      { path: 'cursos/novo', component: CursosFormComponent },
      { path: 'cursos/:id', component: CursosFormComponent },
      { path: ':id/matriz', component: CursoDetalheComponent },
    ],
  },
  {
     path: 'matriz',
      canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD, ROLES.PROF, ROLES.ALUNO])],
      component: MatrizViewComponent,
  },
  {
  path: 'professores',
  component: ProfessoresListComponent,
  canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
  children: [
    { path: '', component: ProfessoresListComponent },
    { path: 'novo', component: ProfessoresFormComponent },
    { path: ':id', component: ProfessoresFormComponent }
  ]
},
{
  path: 'alunos',
  component: AlunosListComponent,
  canActivate: [roleGuard([ROLES.ADMIN, ROLES.COORD])],
  children: [
    { path: '', component: AlunosListComponent },
    { path: 'novo', component: AlunosFormComponent },
    { path: ':id', component: AlunosFormComponent }
  ]
},
  { path: '**', redirectTo: '' },
];
