import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewerComponent } from './text-viewer.component';

describe('TextViewerComponent', () => {
  let component: TextViewerComponent;
  let fixture: ComponentFixture<TextViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
