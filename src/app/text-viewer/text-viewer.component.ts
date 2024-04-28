import { Component } from '@angular/core';
import { OcrConverterService } from '../ocr-converter.service';

@Component({
  selector: 'app-text-viewer',
  standalone: true,
  imports: [],
  templateUrl: './text-viewer.component.html',
  styleUrl: './text-viewer.component.css'
})
export class TextViewerComponent {

  constructor(private ocrConverterService: OcrConverterService) { }

  text :string = "No text!";

}
