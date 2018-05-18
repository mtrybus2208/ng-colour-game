import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResultToSend } from './../../models/results.model';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {

  @Input() score: number;
  @Input() difficulty: string;
  @Input() timer: number;
  @Input() isTopScore: boolean;
  @Output() sendResult = new EventEmitter<ResultToSend>();

  constructor() { }

  ngOnInit() { }

  onSendResult(name: string): void {
    const resultsToSend = {
      level: this.difficulty,
      user: { name, score: this.score },
      time: this.timer,
    };
    this.sendResult.emit(resultsToSend);
  }

}
