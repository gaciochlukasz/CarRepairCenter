import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  openDataAsPdf(data: string, newWindow?: boolean): string {
    if (data[0] === '"' && data[data.length - 1] === '"') {
      data = data.substring(1, data.length - 1);
    }

    const binary = atob(data.replace(/\s/g, ''));
    const len = binary.length;
    const view = new Uint8Array(new ArrayBuffer(len));
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([view], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

    return url;
  }
}
