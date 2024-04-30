import { Component } from '@angular/core';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exporter',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './exporter.component.html',
  styleUrl: './exporter.component.css'
})
export class ExporterComponent {

constructor(private comm: MasterCommService, private scrooler:ViewportScroller){}
  exporters: string[] = [];

  hasBlob$: Observable<boolean> = this.comm.blobSubject.pipe(map((blob: Blob) => blob != null));

  ngOnInit(){
   this.exporters =this.comm.getExporterList();
   this.scrooler.scrollToAnchor("generate")
   this.hasBlob$.subscribe((value) => this.scrooler.scrollToAnchor("download"));
  }
  generate(){
    this.comm.exportProducts("CVS");
    this.scrooler.scrollToAnchor("generate")
  }

  download(){
    this.comm.download();
  }

}
