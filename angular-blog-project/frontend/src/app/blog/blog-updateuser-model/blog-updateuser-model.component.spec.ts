import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUpdateuserModelComponent } from './blog-updateuser-model.component';

describe('BlogUpdateuserModelComponent', () => {
  let component: BlogUpdateuserModelComponent;
  let fixture: ComponentFixture<BlogUpdateuserModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogUpdateuserModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogUpdateuserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
