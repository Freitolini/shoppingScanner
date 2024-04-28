import { Injectable } from '@angular/core';
import {Tesseract} from "tesseract.ts";


@Injectable({
  providedIn: 'root'
})
export class OcrConverterService {

  constructor() { }

  text!: string;
  convertImageToText(image: File){

    Tesseract
    .recognize(image)
    .progress(console.log)
    .then((res: any) => {
        console.log(res);
    })
    .catch(console.error);
    
  }


}
