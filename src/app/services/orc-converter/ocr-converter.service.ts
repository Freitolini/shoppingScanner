import { Injectable } from '@angular/core';
import { Progress } from 'tesseract.js';
import { Tesseract } from "tesseract.ts";
import { ProgressState, IProgressState, OcrStatus, OcrState } from '../../types/ocr-state';


@Injectable({
  providedIn: 'root'
})
export class OcrConverterService {

  constructor() { }

  text!: string;
  convertImageToText(image: File, progressFunction: (progress: IProgressState) => void): Promise<OcrState> {
      return new Promise<OcrState>((resolve, reject) => {
        try {
        Tesseract.recognize(image).progress((p: Progress) => {
          progressFunction(new ProgressState(this.parseOcrStatus(p.status, p.progress), p.status, p.progress * 100, image.name))
        })
          .then((res) => {
            let state: OcrState = new OcrState();
            state.status = OcrStatus.Complete;
            res.lines.forEach((line) => state.parsedLines.push(line.text))
            state.confidance = res.confidence;
            resolve(state)
          }).catch((err) => {
            reject(err);
          });
        }
        catch (err) {
          reject(err);
        }
      });

}

  private parseOcrStatus(status: string, progress: number): OcrStatus {
    switch (status) {
      case "recognizing text":
        if (progress == 1) {
          return OcrStatus.Complete;
        }
        else {
          return OcrStatus.Processing;
        }
      case "error":
        return OcrStatus.Error;
      default:
        return OcrStatus.Processing;
    }
  }

}
