import { Component,ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import { FilePickerDirective } from '../../directive/file-picker.directive';

@Component({
  selector: 'app-file-picker',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,FilePickerDirective],
  templateUrl: './file-picker.component.html',
  styleUrl: './file-picker.component.css'
})
export class FilePickerComponent {
  fileToUpload!: File;


  @ViewChild('dropZonePicker', { static: true })
  _dropZonePicker: FilePickerDirective;

constructor(private comm: MasterCommService) { }
  
_onFilesChanged(files: any) {
  const file:File = files[0];
  if (file) {
    this.comm.ocrProcess(file);
  }}

_onReset() {
  //this.fileToUpload = null;
}

_reset() {
  this._dropZonePicker.reset();
}

onFileSelected(event : any) {
    const file:File = event.target.files[0];
    console.log("Selected: ",file.name)
    if (file) {
      this.comm.ocrProcess(file);
    }
}


}
