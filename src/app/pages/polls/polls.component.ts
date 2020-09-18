import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FormatterService } from 'src/app/services/formatter/formatter.service';
import { PullRequest } from 'src/app/models/pullrequest.interface';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsPage implements OnInit {

  public repoPulls: PullRequest[] = [];

  public openPulls: PullRequest[] = [];
  public closedPulls: PullRequest[] = [];

  constructor(private cons: ConnectionService, private storageService: StorageService, private formatterService: FormatterService) {
    this.storageService.loading = true;
    this.storageService.updateSidebarState(0);
  }

  ngOnInit(): void {
    this.cons.getPollLength().then(length => {
      this.cons.getPolls(1, length - 1).then(res => {
        this.openPulls = this.sortRequestsOpen(res.filter(pq => this.formatterService.getDateTime(Math.round(Date.now() / 1000)) < pq.voteEnd));
        this.closedPulls = this.sortRequestsClosed(res.filter(pq => this.formatterService.getDateTime(Math.round(Date.now() / 1000)) >= pq.voteEnd));
        this.storageService.loading = false;
      });
    });
  }

  private sortRequestsClosed(pqs: PullRequest[]): PullRequest[] {
    pqs.sort((a, b) => {
      if (a.voteEnd > b.voteEnd) {
        return -1;
      }

      if (a.voteEnd < b.voteEnd) {
        return 1;
      }

      return 0;
    });

    return pqs;
  }

  private sortRequestsOpen(pqs: PullRequest[]): PullRequest[] {
    pqs.sort((a, b) => {
      if (a.voteEnd < b.voteEnd) {
        return -1;
      }

      if (a.voteEnd > b.voteEnd) {
        return 1;
      }

      return 0;
    });

    return pqs;
  }

}
