import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateListingComponent } from './associate-listing.component';

describe('AssociateListingComponent', () => {
  let component: AssociateListingComponent;
  let fixture: ComponentFixture<AssociateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociateListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
