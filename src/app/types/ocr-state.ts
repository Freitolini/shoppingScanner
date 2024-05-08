export class OcrState {
    status: OcrStatus = OcrStatus.None;
    fileName: string = "";
    confidance: number = 0;
    parsedLines: string[] = [];
    description: string = "";

    setError(error: string){
        this.description = error;
        this.status = OcrStatus.Error;
        return this;
    } 
}

export interface IProgressState {
    status: OcrStatus;
    rawStatus: string;
    progress: number;
    fileName: string;
}
  
export class ProgressState implements IProgressState {
    status: OcrStatus = OcrStatus.None;
    progress: number    = 0;
    rawStatus: string  = "";  
    fileName: string = "";
    constructor(status: OcrStatus, rawStatus: string, progress: number, fileName: string) {
        this.progress = progress;
        this.status = status;
        this.rawStatus = rawStatus;
        this.fileName = fileName;
    }


}

export enum OcrStatus {
    None = "None",
    Started = "Started",
    Processing = "Processing",
    Complete = "Complete",
    Error = "error"
} 