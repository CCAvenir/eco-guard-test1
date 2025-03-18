import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyEcoguardComponent } from './why-ecoguard.component';

describe('WhyEcoguardComponent', () => {
  let component: WhyEcoguardComponent;
  let fixture: ComponentFixture<WhyEcoguardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyEcoguardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyEcoguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
