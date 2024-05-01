import { Component, OnInit } from '@angular/core';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { IProduct, Invoice, Product } from '../../types/invoice';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule, getLocaleId, ViewportScroller} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule, TransitionCheckState} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-shop-parser-viewer',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatTableModule,FormsModule,CommonModule,MatButtonModule,MatCheckboxModule,MatDatepickerModule,MatIconModule,CurrencyPipe],
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
  calculatedTotal:number = 0;
  totalReal:number = 0;
  approvedTotal:number = 0;

  constructor(private comm: MasterCommService, private viewPortScroller:ViewportScroller) { }

  
  ngOnInit(){
    this.parserList = this.comm.getParserList();
    this.selected = this.parserList[0];
  }

  parse(){
    let dateString:string = formatDate(this.date,'dd/MM/yyyy',getLocaleId("en"));
    this.dataSource = [];
    let invoice: Invoice;
    if (this.overrideDate){
      invoice = this.comm.parseLines(this.selected,dateString);
    }
    else {
      invoice = this.comm.parseLines(this.selected);
    }
    this.dataSource = this.invoiceToProductLine(invoice);
    this.calculatedTotal = invoice.calculateTotal;
    this.totalReal = invoice.totalReal;
    console.log("Parsed: ",invoice);
  }

  remove(element:IProduct){
    this.dataSource = this.dataSource.filter((value) => value != element);
  }

  approve(element:IProduct){
    this.dataSource.filter((value) => value == element).forEach((value) => value.approved = true);
    this.approvedTotal = this.dataSource.filter((value) => value.approved).reduce((acc, value) => acc + Number(value.price),0);
    this.allApproved$.next(this.dataSource.every((value) => value.approved) && this.approvedTotal == this.totalReal);
  }

  publish(){
    this.comm.publishInvoice(this.productLineToInvoice(this.dataSource));
  }
  scrollToPublish(){
    console.log("toooooDown")
    this.viewPortScroller.scrollToAnchor("publish");
  }

  invoiceToProductLine(invoice:Invoice):ProductLine[]{
    let result:ProductLine[] = [];
    invoice.products.forEach((product) => {
      result.push(new ProductLine(invoice.date,invoice.payee,product.description,product.price,product.approved));
    });
    return result;
  }

  productLineToInvoice(lines:ProductLine[]):Invoice{
    let products:IProduct[] = [];
    let date:string = lines[0].date;
    let payee:string = lines[1].date;;
    lines.forEach((line) => {
      products.push({description:line.description,price:line.price,approved:line.approved});
    });
    return new Invoice(date,payee,products,this.calculatedTotal,this.totalReal);
  } 

}

interface IProductLine{
  date: string;
  payee: string;
  description: string;
  price: number;
  approved: boolean;

}
class ProductLine implements IProductLine{
  date: string;
  payee: string;
  description: string;
  price: number;
  approved: boolean;
  constructor(date:string,payee:string,description:string,price:number,approved:boolean){
    this.date = date;
    this.payee = payee;
    this.description = description;
    this.price = price;
    this.approved = approved;
  }
} 
