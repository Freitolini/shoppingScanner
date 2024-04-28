import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilePickerComponent, TextViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoplist';
}
