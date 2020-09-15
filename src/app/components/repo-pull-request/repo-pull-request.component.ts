import { Component, OnInit, Input } from '@angular/core';
import { PullRequest } from 'src/app/models/pullrequest.interface';
import { FormatterService } from 'src/app/services/formatter/formatter.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repo-pull-request',
  templateUrl: './repo-pull-request.component.html',
  styleUrls: ['./repo-pull-request.component.scss']
})
export class RepoPullRequestComponent implements OnInit {

  @Input() repoPull: PullRequest;
  public time: string = "";

  constructor(public formatService: FormatterService, private router: Router, private storageService: StorageService) { 
  }

  ngOnInit(): void {
    this.time = this.formatService.formatTime(this.repoPull.voteEnd);
  }

  public showRequestVote(): void {
    this.storageService.pullrequest = this.repoPull;
    this.router.navigate(["/votes", this.repoPull.id]);
  }

}
