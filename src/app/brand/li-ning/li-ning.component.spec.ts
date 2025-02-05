import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiNingComponent } from './li-ning.component';

describe('LiNingComponent', () => {
  let component: LiNingComponent;
  let fixture: ComponentFixture<LiNingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiNingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiNingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
