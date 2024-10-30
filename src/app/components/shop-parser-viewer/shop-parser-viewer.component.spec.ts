import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopParserViewerComponent } from './shop-parser-viewer.component';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('ShopParserViewerComponent', () => {
  let component: ShopParserViewerComponent;
  let fixture: ComponentFixture<ShopParserViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopParserViewerComponent],
      providers: [provideAnimations()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopParserViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
