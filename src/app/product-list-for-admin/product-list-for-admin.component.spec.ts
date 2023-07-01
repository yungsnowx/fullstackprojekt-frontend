import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListForAdminComponent } from './product-list-for-admin.component';

describe('ProductListForAdminComponent', () => {
  let component: ProductListForAdminComponent;
  let fixture: ComponentFixture<ProductListForAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListForAdminComponent]
    });
    fixture = TestBed.createComponent(ProductListForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
