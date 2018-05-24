import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSchemaComponent } from './custom-schema.component';

describe('CustomSchemaComponent', () => {
  let component: CustomSchemaComponent;
  let fixture: ComponentFixture<CustomSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
