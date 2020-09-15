import { Injectable } from '@angular/core';
import { PullRequest } from 'src/app/models/pullrequest.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public pullrequest: PullRequest;
  public loading: boolean = false;
  public userId: number = 1;
  public sidebarState: boolean[] = [
    true,
    false
  ]

  constructor() { }

  public updateSidebarState(index: number): void {
    this.sidebarState = [false, false];
    this.sidebarState[index] = true;
  }
}
