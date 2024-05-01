import { Injectable } from '@angular/core';
import { OcrConverterService } from '../services/orc-converter/ocr-converter.service';
import { ShopParserService } from '../services/shop-parser/shop-parser.service';
import { ExporterService } from '../services/exporter/exporter.service';
import { DownloadService } from '../services/downloader/download.service';
import { Observer, Subject } from 'rxjs';
import { IProgressState, OcrState } from '../types/ocr-state';
import { Invoice, IProduct } from '../types/invoice';


@Injectable({
  providedIn: 'root'
})
export class MasterCommService {

  fileSubject: Subject<File> = new Subject<File>();
  file:File = new File([""],"");
  lineSubject: Subject<OcrState> = new Subject<OcrState>();
  lines: string[] = [];
  ocrProcessSubject: Subject<IProgressState> = new Subject<IProgressState>();
  invoiceSubject: Subject<Invoice> = new Subject<Invoice>();
  invoice: Invoice;
  blobSubject: Subject<Blob> = new Subject<Blob>();
  blob!: Blob;
  constructor(private ocrConverterService: OcrConverterService, 
    private shopParserService: ShopParserService, 
    private exporterService: ExporterService, 
    private downloadService: DownloadService) { 

    this.subscribeToLines((lines) => {
      this.lines = lines.parsedLines;
    });
    this.subscribeToInvoice((products) => {
      this.invoice = products;
    });
    this.subscribeToFile((file) => {
      this.file = file;
    });
    this.blobSubject.subscribe((blob) => {  
      this.blob = blob;  
    });
  }

  subscribeToBlob(blobFunc: Partial<Observer<Blob>> | ((value: Blob) => void) | undefined) {
    this.blobSubject.subscribe(blobFunc);
  }
  subscribeToFile(fileFunc: Partial<Observer<File>> | ((value: File) => void) | undefined) { 
    this.fileSubject.subscribe(fileFunc);}
  subscribeToLines(lineFunc: Partial<Observer<OcrState>> | ((value: OcrState) => void) | undefined) {
    this.lineSubject.subscribe(lineFunc);}
  subscribeToOcrProcess(ocrFunc: Partial<Observer<IProgressState>> | ((value: IProgressState) => void) | undefined) {
    this.ocrProcessSubject.subscribe(ocrFunc);}
  subscribeToInvoice(productsFunc: Partial<Observer<Invoice>> | ((value: Invoice) => void) | undefined) {
    this.invoiceSubject.subscribe(productsFunc);}


    parseLines(shopName: string,date?:string): Invoice{
      return this.shopParserService.parseShop(this.lines,shopName,date);
    }

    publishInvoice(invoice: Invoice){
      this.invoiceSubject.next(invoice);
    }

    getParserList():string[]{
      return this.shopParserService.getParsers();
    }

    download() {
      this.downloadService.download(this.blob);
    }
    exportProducts(exporter: string) {
      this.exporterService.exportProducts(exporter,this.invoice).then((blob) => {this.blobSubject.next(blob)});
    }
    getExporterList(): string[] {
      return this.exporterService.getExporterList();
    }

  ocrProcess(file: File){
    this.fileSubject.next(file);
    this.ocrConverterService.convertImageToText(file,(progress:  IProgressState) => {
      this.ocrProcessSubject.next(progress);
  })
    .then((lines:OcrState) => { 
      this.lineSubject.next(lines);
      console.log("PARSEDD")})
    .catch(console.error);
  }

}
