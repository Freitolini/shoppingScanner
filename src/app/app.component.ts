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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CurrencyPipe} from '@angular/common';
import { OcrState, OcrStatus } from './types/ocr-state';
import { Invoice, InvoiceStatus } from './types/invoice';

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
    FilePickerDirective,MatCheckboxModule,MatDatepickerModule,CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoplist';

  hasFile$: Observable<boolean> = this.comm.fileSubject.pipe(map((file: File) => file != null));
  hasLines$: Observable<boolean> = this.comm.ocrStateSubject.pipe(map((ocrState: OcrState) => ocrState.status != OcrStatus.None));
  hasInvoice$: Observable<boolean> = this.comm.invoiceSubject.pipe(map((invoice: Invoice) => invoice.status == InvoiceStatus.Complete));

constructor(private comm: MasterCommService){}

}
