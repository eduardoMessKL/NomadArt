import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishArtComponent } from './publish-art.component';

describe('PublishArtComponent', () => {
  let component: PublishArtComponent;
  let fixture: ComponentFixture<PublishArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishArtComponent]
    });
    fixture = TestBed.createComponent(PublishArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
