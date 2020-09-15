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

  constructor(private cons: ConnectionService, private storageService: StorageService, private formatterService: FormatterService) {
    this.storageService.loading = true;
    this.storageService.updateSidebarState(0);
  }

  ngOnInit(): void {
    this.cons.getPollLength().then(length => {
      this.cons.getPolls(1, length - 1).then(res => {
        this.repoPulls = res;
        this.sortRequests();
        this.storageService.loading = false;
      });
    });
  }

  private sortRequests(): void {
    this.repoPulls.sort((a, b) => {
      if(a.voteEnd < b.voteEnd) {
        return -1;
      }

      if(a.voteEnd > b.voteEnd) {
        return 1;
      }

      return 0;
    });
  }

}
