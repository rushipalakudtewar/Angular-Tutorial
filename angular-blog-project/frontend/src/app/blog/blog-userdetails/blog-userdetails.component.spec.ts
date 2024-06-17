import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUserdetailsComponent } from './blog-userdetails.component';

describe('BlogUserdetailsComponent', () => {
  let component: BlogUserdetailsComponent;
  let fixture: ComponentFixture<BlogUserdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogUserdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
