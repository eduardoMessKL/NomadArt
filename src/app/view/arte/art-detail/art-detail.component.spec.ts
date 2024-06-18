import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtDetailComponent } from './art-detail.component';

describe('ArtDetailComponent', () => {
  let component: ArtDetailComponent;
  let fixture: ComponentFixture<ArtDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtDetailComponent]
    });
    fixture = TestBed.createComponent(ArtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
