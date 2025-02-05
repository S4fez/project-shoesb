import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntaComponent } from './anta.component';

describe('AntaComponent', () => {
  let component: AntaComponent;
  let fixture: ComponentFixture<AntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
