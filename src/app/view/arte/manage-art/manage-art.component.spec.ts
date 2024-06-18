import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArtComponent } from './manage-art.component';

describe('ManageArtComponent', () => {
  let component: ManageArtComponent;
  let fixture: ComponentFixture<ManageArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageArtComponent]
    });
    fixture = TestBed.createComponent(ManageArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
