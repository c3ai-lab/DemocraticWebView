import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  public formatTime(time: number): string {
    const parsedTime: string = time != undefined ? time.toString() : "0";
    return parsedTime.slice(6, 8) + "-" +
      parsedTime.slice(4, 6) + "-" +
      parsedTime.slice(0, 4) + " " +
      parsedTime.slice(8, 10) + ":" +
      parsedTime.slice(10, 12) + ":" +
      parsedTime.slice(12, 14)
  }

  public getDateTime(date: number): number {
    const now = new Date(date * 1000);
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    return parseInt(dateLocal.toISOString().slice(0, 19).replace(/-/g, "").replace("T", "").replace(/:/g, ""));
  }
}
