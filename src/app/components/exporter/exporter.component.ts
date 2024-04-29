import { Component } from '@angular/core';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-exporter',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,CommonModule],
  templateUrl: './exporter.component.html',
  styleUrl: './exporter.component.css'
})
export class ExporterComponent {

constructor(private comm: MasterCommService){}
  exporters: string[] = [];

  hasBlob$: Observable<boolean> = this.comm.blobSubject.pipe(map((blob: Blob) => blob != null));

  ngOnInit(){
   this.exporters =this.comm.getExporterList();
  }
  generate(){
    this.comm.exportProducts("CVS");
  }

  download(){
    this.comm.download();
  }

}
