import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosForm } from './alunos-form.component';

describe('AlunosForm', () => {
  let component: AlunosForm;
  let fixture: ComponentFixture<AlunosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
