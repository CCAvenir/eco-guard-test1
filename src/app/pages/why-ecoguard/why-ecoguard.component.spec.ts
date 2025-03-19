import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyEcoGuardComponent } from './why-ecoguard.component';

describe('WhyEcoguardComponent', () => {
  let component: WhyEcoGuardComponent;
  let fixture: ComponentFixture<WhyEcoGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyEcoGuardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyEcoGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
