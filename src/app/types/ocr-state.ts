export class OcrState {
    status: OcrStatus = OcrStatus.None;
    fileName: string = "";
    confidance: number = 0;
    parsedLines: string[] = [];
}

export interface IProgressState {
    status: OcrStatus;
    rawStatus: string;
    progress: number;
}
  
export class ProgressState implements IProgressState {
    status: OcrStatus = OcrStatus.None;
    progress: number    = 0;
    rawStatus: string  = "";  
    constructor(status: OcrStatus, rawStatus: string, progress: number) {
        this.progress = progress;
        this.status = status;
        this.rawStatus = rawStatus;
    }
}

export enum OcrStatus {
    None = "None",
    Processing = "Processing",
    Complete = "Complete",
    Error = "error"
} 