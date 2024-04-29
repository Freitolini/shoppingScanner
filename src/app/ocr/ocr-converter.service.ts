import { Injectable } from '@angular/core';
import {Tesseract} from "tesseract.ts";


@Injectable({
  providedIn: 'root'
})
export class OcrConverterService {

  constructor() { }

  text!: string;
  convertImageToText(image: File): Promise<string[]>{
    return new Promise<string[]>((resolve, reject) => { 
    Tesseract.recognize(image).progress(console.log)
    .then((res) => {
      console.log(res)
        let lines :string[] = []
        res.lines.forEach((line) => lines.push(line.text))
        resolve(lines)
    })
    .catch(reject);
  });
  }

}
