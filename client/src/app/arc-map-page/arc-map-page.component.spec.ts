import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcMapPageComponent } from './arc-map-page.component';

describe('ArcMapPageComponent', () => {
  let component: ArcMapPageComponent;
  let fixture: ComponentFixture<ArcMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcMapPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
