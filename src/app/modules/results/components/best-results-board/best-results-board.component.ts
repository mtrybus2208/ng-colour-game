import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-best-results-board',
  templateUrl: './best-results-board.component.html',
  styleUrls: ['./best-results-board.component.scss']
})
export class BestResultsBoardComponent implements OnInit {

  @Input() result: any;

  constructor() { }

  ngOnInit() {
  }
  
  // !!!!
  mapTime(time) {
    switch (time) {
      case 'short': {
        return '30s';
      }
      case 'medium': {
        return '60s';
      }
      case 'long': {
        return '90s';
      }
      default:
        return '90s';
    }
  }

}
