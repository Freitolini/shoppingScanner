import { Component, OnInit } from '@angular/core';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ProductLine } from '../../types/product-line';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-shop-parser-viewer',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatTableModule,FormsModule,CommonModule],
  templateUrl: './shop-parser-viewer.component.html',
  styleUrl: './shop-parser-viewer.component.css'
})
export class ShopParserViewerComponent implements OnInit{
  parserList: string[] = [];
  dataSource : ProductLine[] = [];
  displayedColumns: string[] = ['Date', 'Payee', 'Description', 'Price', 'Approval'];
  allApproved$: Subject<boolean> = new Subject<boolean>();

  constructor(private comm: MasterCommService) { }

  
  ngOnInit(){
    this.parserList = this.comm.getParserList();
    console.log(this.parserList);
  }

  parse(){
    this.dataSource = this.comm.parseLines("Lidl");
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

}
