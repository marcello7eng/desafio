import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Desafio Frontend</span>
    </mat-toolbar>

    <div style="padding:16px;">
      <button mat-raised-button color="accent">Teste Angular Material</button>
    </div>
  `
})
export class AppComponent {}
