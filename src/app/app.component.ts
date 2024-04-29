import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MasterCommService } from './master-comm.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    FilePickerComponent, 
    TextViewerComponent,
    MatIconModule,
  MatButtonModule,
  CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoplist';
  lines$: Observable<boolean>

constructor(private comm: MasterCommService){}
  isParsed(){
    this.comm.lines.length != 0
  }

}
