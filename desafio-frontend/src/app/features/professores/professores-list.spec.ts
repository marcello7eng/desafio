import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessoresListComponent } from './professores-list.component';

describe('ProfessoresListComponent', () => {
  let component: ProfessoresListComponent;
  let fixture: ComponentFixture<ProfessoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessoresListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
