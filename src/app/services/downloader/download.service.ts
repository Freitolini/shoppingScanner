import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  download(blob: Blob) {
      const url = window.URL.createObjectURL(blob);
      console.log(url)
      window.open(url);
    }

  constructor() { }
}
