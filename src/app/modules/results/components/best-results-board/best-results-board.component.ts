import { any } from 'codelyzer/util/function';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ResultsState } from './../../store/reducers';

@Component({
  selector: 'app-best-results-board',
  templateUrl: './best-results-board.component.html',
  styleUrls: ['./best-results-board.component.scss']
})
export class BestResultsBoardComponent implements OnInit, OnChanges {

  @Input() resultArr: Array<{level: string, data: Array<any>}>;
  @Input() lastBestScoreId: string;
  @Input() timer: number;
  @Input() difficulty: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }

  get levelTabIndex() {
    if (!this.lastBestScoreId) { return 1; }
    switch (this.difficulty) {
      case 'easy': return 0;
      case 'medium': return 1;
      case 'hard': return 2;
      default: return 1;
    }
  }
  get timeTabIndex() {
    if (!this.lastBestScoreId) { return 1; }
    switch (this.timer) {
      case 30: return 0;
      case 60: return 1;
      case 90: return 2;
      default: return 1;
    }
  }

}
