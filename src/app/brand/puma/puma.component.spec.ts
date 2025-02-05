import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumaComponent } from './puma.component';

describe('PumaComponent', () => {
  let component: PumaComponent;
  let fixture: ComponentFixture<PumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PumaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
