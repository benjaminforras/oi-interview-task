import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingHeroFooterComponent } from './landing-hero-footer.component';

describe('LandingHeroFooterComponent', () => {
  let component: LandingHeroFooterComponent;
  let fixture: ComponentFixture<LandingHeroFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHeroFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingHeroFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
