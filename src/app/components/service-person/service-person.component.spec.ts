import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonComponent } from './service-person.component';

describe('ServicePersonComponent', () => {
  let component: ServicePersonComponent;
  let fixture: ComponentFixture<ServicePersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePersonComponent]
    });
    fixture = TestBed.createComponent(ServicePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
