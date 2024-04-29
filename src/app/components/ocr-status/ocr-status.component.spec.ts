import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrStatusComponent } from './ocr-status.component';

describe('OcrStatusComponent', () => {
  let component: OcrStatusComponent;
  let fixture: ComponentFixture<OcrStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcrStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
