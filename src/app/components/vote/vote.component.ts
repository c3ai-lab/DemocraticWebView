import { Component, OnInit, Input } from '@angular/core';
import { Vote } from 'src/app/models/vote.interface';
import { FormatterService } from 'src/app/services/formatter/formatter.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() vote: Vote;
  public address: string = "";

  constructor() {}

  ngOnInit(): void {
    this.address = this.vote.name;
  }

}
