import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionArtComponent } from './description-art.component';

describe('DescriptionArtComponent', () => {
  let component: DescriptionArtComponent;
  let fixture: ComponentFixture<DescriptionArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionArtComponent]
    });
    fixture = TestBed.createComponent(DescriptionArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
