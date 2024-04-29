import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilePickerComponent } from './components/file-picker/file-picker.component';
import { OcrStatusComponent } from './components/ocr-status/ocr-status.component';
import { ShopParserViewerComponent } from './components/shop-parser-viewer/shop-parser-viewer.component';
import { ExporterComponent } from './components/exporter/exporter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule}  from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MasterCommService } from './master-comm-service/master-comm.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FilePickerDirective } from './directive/file-picker.directive';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FilePickerComponent, 
    OcrStatusComponent,
    ShopParserViewerComponent,
    ExporterComponent,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    FilePickerDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoplist';

  hasFile$: Observable<boolean> = this.comm.ocrProcessSubject.pipe(map((progress) => progress.progress > 0));
  hasLines$: Observable<boolean> = this.comm.lineSubject.pipe(map((ocrState) => ocrState.parsedLines.length > 0));
  hasProducts$: Observable<boolean> = this.comm.productsSubject.pipe(map((products) => products.length > 0));

constructor(private comm: MasterCommService){}
  ngOnInit(){
    this.comm.subscribeToLines((ocrState) => {
      this.hasLines$.pipe(map((hasLines) => ocrState.parsedLines.length > 0));
    });
  }

}
