import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresForm } from './professores-form.component';

describe('ProfessoresForm', () => {
  let component: ProfessoresForm;
  let fixture: ComponentFixture<ProfessoresForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessoresForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessoresForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
