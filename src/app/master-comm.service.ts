import { Injectable } from '@angular/core';
import { ProductLine } from './types/product-line';
import { OcrConverterService } from './ocr/ocr-converter.service';

@Injectable({
  providedIn: 'root'
})
export class MasterCommService {

  lines: string[] = [];
  
  products: ProductLine[] = []

  constructor(private ocrConverterService: OcrConverterService) { }

  ocrProcess(file: File){
    this.ocrConverterService.convertImageToText(file)
    .then((lines) => { 
      this.lines = lines; 
      console.log("PARSEDD")})
    .catch(console.error);

  }

  setProducts(products :ProductLine[]){
    this.products = products;
  }

}
