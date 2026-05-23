import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpdComponent } from './detailpd.component';

describe('DetailpdComponent', () => {
  let component: DetailpdComponent;
  let fixture: ComponentFixture<DetailpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailpdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
