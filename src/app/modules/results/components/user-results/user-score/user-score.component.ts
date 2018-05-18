import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.scss']
})
export class UserScoreComponent implements OnInit {

  @Input() score: number;
  @Input() difficulty: string;
  @Input() timer: number;

  constructor() { }

  ngOnInit() { }

}
