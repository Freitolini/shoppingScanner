import { Component, OnInit } from '@angular/core';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ProductLine } from '../../types/product-line';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule, getLocaleId, ViewportScroller} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule, TransitionCheckState} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-shop-parser-viewer',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatTableModule,FormsModule,CommonModule,MatButtonModule,MatCheckboxModule,MatDatepickerModule,MatIconModule],
  templateUrl: './shop-parser-viewer.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './shop-parser-viewer.component.css'
})

export class ShopParserViewerComponent implements OnInit{
  parserList: string[] = [];
  dataSource : ProductLine[] = [];
  displayedColumns: string[] = ['date', 'payee', 'description', 'price', 'approval'];
  allApproved$: Subject<boolean> = new Subject<boolean>();
  selected:string = "";
  overrideDate :boolean = false;
  date:Date = new Date();

  constructor(private comm: MasterCommService, private viewPortScroller:ViewportScroller) { }

  
  ngOnInit(){
    this.parserList = this.comm.getParserList();
    this.selected = this.parserList[0];
  }

  parse(){
    let dateString:string = formatDate(this.date,'dd/MM/yyyy',getLocaleId("en"));
    this.dataSource = [];
    if (this.overrideDate){
      this.dataSource = this.comm.parseLines(this.selected,dateString);
    }
    else {
      this.dataSource = this.comm.parseLines(this.selected);

    }
  }
  remove(element:ProductLine){
    this.dataSource = this.dataSource.filter((value) => value != element);
  }
  approve(element:ProductLine){
    this.dataSource.filter((value) => value == element).forEach((value) => value.approved = true);
    this.allApproved$.next(this.dataSource.every((value) => value.approved));
    
  }

  publish(){
    this.comm.publishProducts(this.dataSource);
  }
  scrollToPublish(){
    console.log("toooooDown")
    this.viewPortScroller.scrollToAnchor("publish");
  }

}
