import { Component } from '@angular/core';
import { OcrConverterService } from '../ocr-converter.service';


@Component({
  selector: 'app-file-picker',
  standalone: true,
  imports: [],
  templateUrl: './file-picker.component.html',
  styleUrl: './file-picker.component.css'
})
export class FilePickerComponent {
  fileToUpload!: File;

constructor(private ocrConverterService: OcrConverterService) { }
  

fileName = '';


onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {

        this.ocrConverterService.convertImageToText(file);
    }
}


}
