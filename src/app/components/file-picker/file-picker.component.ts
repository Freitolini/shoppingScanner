import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import { TmplAstSwitchBlockCase } from '@angular/compiler';


@Component({
  selector: 'app-file-picker',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './file-picker.component.html',
  styleUrl: './file-picker.component.css'
})
export class FilePickerComponent {
  fileToUpload!: File;

constructor(private comm: MasterCommService) { }
  
fileName = '';


onFileSelected(event : any) {
    const file:File = event.target.files[0];
    this.fileName = file.name;
    if (file) {
      this.comm.ocrProcess(file);
    }
}


}
