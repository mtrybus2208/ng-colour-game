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

  constructor() { }

  ngOnInit() {
    this.setTab();
  }

  ngOnChanges() { }

  setTab() {
    
  }
 

}
