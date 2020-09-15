import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { FormatterService } from 'src/app/services/formatter/formatter.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PullRequest } from 'src/app/models/pullrequest.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Vote } from 'src/app/models/vote.interface';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesPage implements OnInit {


  public request: PullRequest;
  public pullrequestId: string;

  public chosenOption: any = {};
  public voteControl = new FormControl();
  public voteOptions: any[] = [{ value: 1, text: 'Yes, accept request' }, { value: 0, text: 'No, reject request' }];

  public showCompleteResult: boolean = false;
  public completeResult: boolean = false;

  public votes: Vote[] = []

  public exampleVoters: string[] = [
    "0x28cfba097ff9bb9d904471c493b032df45b9f953",
    "0xabcdef6935419a2c9913abcf5c24dbc2dfdc9cd4",
    "0x5380e40afad8cdec0b841c4740985f1735aa5acb",
    "0x582779d575a76748984f1fa2cc116ea15aa38f30",
    "0xe0f41488faa62a6b8dc2d3081fc473c9d2967cb9",
    "0x5581364f1350b82ed4e25874f3727395bf6ce490",
    "0xdd5429b3ee3d13ef6d829e9815725856d2b224e7",
    "0xf46d35685e3cc79bafc59df0fdbafe11a520ff7d",
    "0xb1d4792f43098535da6b589afdd762df94490c66",
    "0x617da121abf03d4c1af572f5a4e313e26bef7bdc",
    "0x557dceb9c965f40698c9c2abb5e89b27fc052b20"
  ];


  constructor(private cons: ConnectionService,
    public formatterService: FormatterService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

    this.storageService.updateSidebarState(0);
  }

  async ngOnInit() {
    this.pullrequestId = this.route.snapshot.paramMap.get('pullid');
    this.getPoll(parseInt(this.pullrequestId));
  }


  public async createUserVote() {
    if (!(typeof this.chosenOption == "object")) {
      this.storageService.loading = true;
      const sum = parseInt(this.request.votersApproveCount) + parseInt(this.request.votersDenyCount);
      await this.cons.createFakeVote(this.request.id, this.chosenOption == 1, this.exampleVoters[sum]);
      this.getPoll(this.request.id);
    } else {
      this.showSnackbar("Please set a vote choice!");
    }
  }

  public openLink(): void {
    this.cons.openProviderLink(this.request.pullRequestLink);
  }

  private getPoll(index: number): void {
    this.storageService.loading = true;
    this.cons.getPoll(index).then(async res => {
      this.request = res;
      if(res.voteEnd < this.formatterService.getDateTime(Date.now() / 1000)) {
        this.showCompleteResult = true;
        await this.checkCompleteResult(index);
      }
      this.getVoters(parseInt(this.pullrequestId));
    });
  }

  private checkCompleteResult(index: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.completeResult = await this.cons.getVotingResult(index);
      resolve();
    });
  }

  private getVoters(index: number): void {
    this.votes = []
    this.cons.getVotersApprove(index).then(positiveVoters => {
      this.addVotes(positiveVoters, true);
      this.cons.getVotersDeny(index).then(negativeVoters => {
        this.addVotes(negativeVoters, false);
        this.storageService.loading = false;
      })
    });
  }

  private addVotes(list: string[], state: boolean): void {
    list.forEach(v => {
      this.votes.push({ state: state, name: v });
    });
  }

  public showSnackbar(text: string): void {
    this.snackBar.open(text, "Close", {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
