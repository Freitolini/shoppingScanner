import { Injectable } from '@angular/core';
import { OcrConverterService } from '../services/orc-converter/ocr-converter.service';
import { ShopParserService } from '../services/shop-parser/shop-parser.service';
import { ExporterService } from '../services/exporter/exporter.service';
import { DownloadService } from '../services/downloader/download.service';
import { Observer, Subject } from 'rxjs';
import { IProgressState, OcrState } from '../types/ocr-state';
import { ProductLine } from '../types/product-line';


@Injectable({
  providedIn: 'root'
})
export class MasterCommService {

  fileSubject: Subject<File> = new Subject<File>();
  file:File = new File([""],"");
  lineSubject: Subject<OcrState> = new Subject<OcrState>();
  lines: string[] = [];
  ocrProcessSubject: Subject<IProgressState> = new Subject<IProgressState>();
  productsSubject: Subject<ProductLine[]> = new Subject<ProductLine[]>();
  prodcuts: ProductLine[] = [];
  blobSubject: Subject<Blob> = new Subject<Blob>();
  blob!: Blob;
  constructor(private ocrConverterService: OcrConverterService, 
    private shopParserService: ShopParserService, 
    private exporterService: ExporterService, 
    private downloadService: DownloadService) { 

    this.subscribeToLines((lines) => {
      this.lines = lines.parsedLines;
    });
    this.subscribeToProducts((products) => {
      this.prodcuts = products;
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
  subscribeToProducts(productsFunc: Partial<Observer<ProductLine[]>> | ((value: ProductLine[]) => void) | undefined) {
    this.productsSubject.subscribe(productsFunc);}


    parseLines(shopName: string,date?:string): ProductLine[]{
      let products = this.shopParserService.parseShop(this.lines,shopName,date);
      return products;
    }

    publishProducts(products: ProductLine[]){
      this.productsSubject.next(products);
    }

    getParserList():string[]{
      return this.shopParserService.getParsers();
    }

    download() {
      this.downloadService.download(this.blob);
    }
    exportProducts(exporter: string) {
      this.exporterService.exportProducts(exporter,this.prodcuts).then((blob) => {this.blobSubject.next(blob)});
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
