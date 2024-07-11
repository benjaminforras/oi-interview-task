import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingHeroFormComponent } from './landing-hero-form.component';

describe('LandingHeroFormComponent', () => {
  let component: LandingHeroFormComponent;
  let fixture: ComponentFixture<LandingHeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHeroFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
