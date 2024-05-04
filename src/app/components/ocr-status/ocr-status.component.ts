import { Component } from '@angular/core';
import { OcrState, OcrStatus } from '../../types/ocr-state';
import { MasterCommService } from '../../master-comm-service/master-comm.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IProgressState, ProgressState } from '../../types/ocr-state';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-ocr-status',
  standalone: true,
  imports: [MatProgressBarModule,CommonModule],
  templateUrl: './ocr-status.component.html',
  styleUrl: './ocr-status.component.css'
})
export class OcrStatusComponent {

  progress: IProgressState = new ProgressState(OcrStatus.None,"",0,"");
  ocrState: OcrState = new OcrState();
  isParsed$: Subject<boolean> = new Subject<boolean>();

  constructor(private comm: MasterCommService) {
    this.comm.subscribeToOcrProcess((progress:IProgressState) => {
      this.progress.progress = progress.progress;
      this.progress.status = progress.status;
      this.progress.rawStatus = progress.rawStatus
      this.progress.fileName = progress.fileName;
    });
    this.comm.subscribeToLines((ocrState: OcrState) => {
      this.isParsed$.next(ocrState.parsedLines.length > 0);
      this.ocrState = ocrState;
      console.log(this.ocrState)
    });

  }

}
